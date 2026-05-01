import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  async getStats() {
    return { status: 'ok', uptime: process.uptime() };
  }
}
