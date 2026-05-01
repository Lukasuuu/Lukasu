const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  private getToken(): string | null {
    return localStorage.getItem('bm_access_token');
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    options?: RequestInit,
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options?.headers as Record<string, string>),
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(url, {
      ...options,
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (res.status === 204) {
      return undefined as T;
    }

    let data: unknown;
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      data = await res.json();
    } else {
      data = await res.text();
    }

    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem('bm_access_token');
        window.dispatchEvent(new Event('bm:session-expired'));
      }
      const message =
        typeof data === 'object' && data !== null && 'message' in data
          ? String((data as Record<string, unknown>).message)
          : `HTTP ${res.status}`;
      throw new ApiError(message, res.status, data);
    }

    return data as T;
  }

  get<T>(path: string, options?: RequestInit) {
    return this.request<T>('GET', path, undefined, options);
  }

  post<T>(path: string, body: unknown, options?: RequestInit) {
    return this.request<T>('POST', path, body, options);
  }

  put<T>(path: string, body: unknown, options?: RequestInit) {
    return this.request<T>('PUT', path, body, options);
  }

  patch<T>(path: string, body: unknown, options?: RequestInit) {
    return this.request<T>('PATCH', path, body, options);
  }

  delete<T>(path: string, options?: RequestInit) {
    return this.request<T>('DELETE', path, undefined, options);
  }

  // ---------------------------------------------------------------------------
  // Auth
  // ---------------------------------------------------------------------------
  async login(email: string, password: string) {
    const res = await this.post<{ accessToken: string; user: unknown }>(
      '/auth/login',
      { email, password },
    );
    if (res.accessToken) {
      localStorage.setItem('bm_access_token', res.accessToken);
    }
    return res;
  }

  async register(email: string, password: string, name: string, tenantId?: string) {
    const res = await this.post<{ accessToken: string; user: unknown }>(
      '/auth/register',
      { email, password, name, tenantId },
    );
    if (res.accessToken) {
      localStorage.setItem('bm_access_token', res.accessToken);
    }
    return res;
  }

  async getMe() {
    return this.get<{ user: unknown }>('/auth/me');
  }

  logout() {
    localStorage.removeItem('bm_access_token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  // ---------------------------------------------------------------------------
  // Bookings
  // ---------------------------------------------------------------------------
  async getBookings(tenantId: string) {
    return this.get<unknown[]>('/bookings?tenantId=' + encodeURIComponent(tenantId));
  }

  async createBooking(body: {
    catalogItemId: string;
    customerEmail: string;
    customerName?: string;
    startTime: string;
    endTime: string;
    notes?: string;
  }) {
    return this.post<unknown>('/bookings', body);
  }

  // ---------------------------------------------------------------------------
  // Users
  // ---------------------------------------------------------------------------
  async getUser(id: string) {
    return this.get<unknown>(`/users/${id}`);
  }

  // ---------------------------------------------------------------------------
  // Payments
  // ---------------------------------------------------------------------------
  async createCheckoutSession(body: {
    priceId: string;
    userId: string;
    userEmail?: string;
    planType?: string;
    appUrl?: string;
  }) {
    return this.post<{ url: string }>('/payments/checkout', body);
  }

  async createPortalSession(body: { customerId: string; appUrl?: string }) {
    return this.post<{ url: string }>('/payments/portal', body);
  }

  // ---------------------------------------------------------------------------
  // Webhooks
  // ---------------------------------------------------------------------------
  async handleStripeWebhook(rawBody: string, signature: string) {
    return this.post<{ received: boolean }>('/webhooks/stripe', rawBody, {
      headers: { 'stripe-signature': signature, 'Content-Type': 'application/json' },
    });
  }

  // ---------------------------------------------------------------------------
  // Health
  // ---------------------------------------------------------------------------
  async healthCheck() {
    return this.get<{ status: string }>('/health');
  }
}

export const api = new ApiClient(API_BASE_URL);
