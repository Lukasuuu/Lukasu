import { Controller, Post, Body } from '@nestjs/common';

class ContactDto {
  name!: string;
  email!: string;
  subject!: string;
  message!: string;
}

@Controller('contact')
export class ContactController {
  @Post()
  async submit(@Body() dto: ContactDto) {
    // TODO: integrate with Resend / email service
    console.log('[Contact]', dto);
    return { success: true };
  }
}
