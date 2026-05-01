import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AvailabilityService {
  constructor(private prisma: PrismaService) {}

  async findByCatalogItem(catalogItemId: string) {
    return this.prisma.availability.findMany({ where: { catalogItemId } });
  }
}
