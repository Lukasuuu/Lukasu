import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

class CreateCheckoutDto {
  priceId!: string;
  userId!: string;
  userEmail?: string;
  planType?: string;
  appUrl?: string;
}

class CreatePortalDto {
  customerId!: string;
  appUrl?: string;
}

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('checkout')
  async checkout(@Body() dto: CreateCheckoutDto) {
    return this.paymentsService.createCheckoutSession(dto);
  }

  @Post('portal')
  async portal(@Body() dto: CreatePortalDto) {
    return this.paymentsService.createPortalSession(dto);
  }
}
