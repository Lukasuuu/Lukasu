import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, type: string, channel: string, payload?: object) {
    return this.prisma.notification.create({
      data: { userId, type, channel, payload: payload || {} },
    });
  }
}
