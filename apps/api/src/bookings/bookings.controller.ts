import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

class CreateBookingDto {
  catalogItemId!: string;
  customerEmail!: string;
  customerName?: string;
  startTime!: Date;
  endTime!: Date;
  notes?: string;
}

@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Get()
  async findAll(@Query('tenantId') tenantId: string) {
    return this.bookingsService.findByTenant(tenantId);
  }

  @Post()
  async create(@Body() dto: CreateBookingDto, @Query('tenantId') tenantId: string) {
    return this.bookingsService.create({ ...dto, tenantId });
  }
}
