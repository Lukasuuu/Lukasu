import { Controller, Post, Req, Headers, BadRequestException, ServiceUnavailableException } from '@nestjs/common';
import { Request } from 'express';
import { WebhooksService } from './webhooks.service';

@Controller('webhooks')
export class WebhooksController {
  constructor(private webhooksService: WebhooksService) {}

  @Post('stripe')
  async stripe(
    @Req() req: Request,
    @Headers('stripe-signature') signature: string,
  ) {
    const rawBody = (req as any).rawBody as Buffer | undefined;
    if (!rawBody) {
      throw new BadRequestException('Missing raw body');
    }

    try {
      await this.webhooksService.handleStripeWebhook(rawBody, signature);
      return { received: true };
    } catch (err: any) {
      if (err.message === 'Stripe not configured') {
        throw new ServiceUnavailableException(err.message);
      }
      throw new BadRequestException(err.message);
    }
  }
}
