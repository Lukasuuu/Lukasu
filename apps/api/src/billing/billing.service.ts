import { Injectable } from '@nestjs/common';

@Injectable()
export class BillingService {
  async getTenantInvoice(tenantId: string) {
    return { tenantId, plan: 'free', due: 0 };
  }
}
