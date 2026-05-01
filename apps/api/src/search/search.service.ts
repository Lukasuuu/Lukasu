import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async searchBookings(tenantId: string, query: string) {
    return this.prisma.booking.findMany({
      where: {
        tenantId,
        OR: [
          { customerEmail: { contains: query, mode: 'insensitive' } },
          { customerName: { contains: query, mode: 'insensitive' } },
        ],
      },
    });
  }
}
