import { Injectable } from '@nestjs/common';

@Injectable()
export class IntegrationsService {
  async listProviders() {
    return ['google_calendar', 'microsoft_outlook', 'zoom'];
  }
}
