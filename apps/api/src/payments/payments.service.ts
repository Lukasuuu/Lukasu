import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: Stripe | null = null;

  constructor(private prisma: PrismaService) {
    if (process.env.STRIPE_SECRET_KEY) {
      this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-02-24.acacia',
      });
    }
  }

  async findByTenant(tenantId: string) {
    return this.prisma.payment.findMany({ where: { tenantId } });
  }

  async createCheckoutSession(data: {
    priceId: string;
    userId: string;
    userEmail?: string;
    planType?: string;
    appUrl?: string;
  }) {
    if (!this.stripe) {
      throw new Error('Stripe not configured');
    }

    const baseUrl = data.appUrl || process.env.VITE_APP_URL || 'https://bookme.pt';

    const session = await this.stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: data.userEmail,
      line_items: [{ price: data.priceId, quantity: 1 }],
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
      allow_promotion_codes: true,
      tax_id_collection: { enabled: true },
      metadata: { userId: data.userId, planType: data.planType || '' },
      subscription_data: {
        trial_period_days: 14,
        metadata: { userId: data.userId, planType: data.planType || '' },
      },
    });

    return { url: session.url };
  }

  async createPortalSession(data: { customerId: string; appUrl?: string }) {
    if (!this.stripe) {
      throw new Error('Stripe not configured');
    }

    const baseUrl = data.appUrl || process.env.VITE_APP_URL || 'https://bookme.pt';

    const session = await this.stripe.billingPortal.sessions.create({
      customer: data.customerId,
      return_url: `${baseUrl}/dashboard/billing`,
    });

    return { url: session.url };
  }
}
