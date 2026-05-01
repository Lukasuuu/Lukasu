import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async findByTenant(tenantId: string) {
    return this.prisma.booking.findMany({
      where: { tenantId },
      orderBy: { startTime: 'asc' },
    });
  }

  async create(data: {
    tenantId: string;
    catalogItemId: string;
    customerEmail: string;
    customerName?: string;
    startTime: Date;
    endTime: Date;
    notes?: string;
  }) {
    return this.prisma.booking.create({ data });
  }
}
