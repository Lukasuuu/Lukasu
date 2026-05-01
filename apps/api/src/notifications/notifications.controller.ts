import { Controller, Post, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

class SendNotificationDto {
  userId!: string;
  type!: string;
  channel!: string;
  payload?: object;
}

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Post()
  async create(@Body() dto: SendNotificationDto) {
    return this.notificationsService.create(dto.userId, dto.type, dto.channel, dto.payload);
  }
}
