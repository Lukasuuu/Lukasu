import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class WebhooksService {
  private stripe: Stripe | null = null;

  constructor(private prisma: PrismaService) {
    if (process.env.STRIPE_SECRET_KEY) {
      this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-02-24.acacia',
      });
    }
  }

  async handleStripeWebhook(rawBody: Buffer, signature: string) {
    if (!this.stripe) {
      throw new Error('Stripe not configured');
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event: Stripe.Event;

    try {
      event = webhookSecret
        ? this.stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
        : JSON.parse(rawBody.toString());
    } catch (err: any) {
      throw new Error(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const { userId, planType } = session.metadata || {};
        if (!userId) break;

        let isTrial = false;
        if (session.subscription) {
          try {
            const subscription = await this.stripe.subscriptions.retrieve(session.subscription as string);
            isTrial = subscription.status === 'trialing' || (subscription.trial_start != null && subscription.trial_end != null);
          } catch (e: any) {
            console.error('[Stripe Webhook] Failed to retrieve subscription:', e.message);
          }
        }

        await this.prisma.payment.upsert({
          where: { providerRef: session.id },
          update: {
            status: isTrial ? 'trialing' : 'active',
            amount: session.amount_total ? session.amount_total / 100 : 0,
            paidAt: new Date(),
          },
          create: {
            tenantId: '', // Will be linked via user in real implementation
            bookingId: '',
            amount: session.amount_total ? session.amount_total / 100 : 0,
            currency: session.currency?.toUpperCase() || 'BRL',
            provider: 'stripe',
            providerRef: session.id,
            status: isTrial ? 'trialing' : 'active',
          },
        });

        // Update user plan reference
        await this.prisma.user.updateMany({
          where: { id: userId },
          data: { role: planType || 'user' },
        });

        break;
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription;
        await this.prisma.payment.updateMany({
          where: { providerRef: sub.id },
          data: { status: sub.status },
        });
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        await this.prisma.payment.updateMany({
          where: { providerRef: sub.id },
          data: { status: 'cancelled' },
        });

        const payments = await this.prisma.payment.findMany({
          where: { providerRef: sub.id },
          select: { tenantId: true },
        });

        for (const payment of payments) {
          await this.prisma.user.updateMany({
            where: { tenantId: payment.tenantId },
            data: { role: 'user' },
          });
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await this.prisma.payment.updateMany({
          where: { providerRef: invoice.subscription as string },
          data: { status: 'payment_failed' },
        });
        break;
      }

      default:
        break;
    }
  }
}
