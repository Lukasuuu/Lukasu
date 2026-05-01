import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TenantsModule } from './tenants/tenants.module';
import { BookingsModule } from './bookings/bookings.module';
import { CatalogModule } from './catalog/catalog.module';
import { AvailabilityModule } from './availability/availability.module';
import { PaymentsModule } from './payments/payments.module';
import { BillingModule } from './billing/billing.module';
import { NotificationsModule } from './notifications/notifications.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { AuditModule } from './audit/audit.module';
import { AdminModule } from './admin/admin.module';
import { SearchModule } from './search/search.module';
import { StorageModule } from './storage/storage.module';
import { HealthModule } from './health/health.module';
import { ContactController } from './contact/contact.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    PrismaModule,
    AuthModule,
    UsersModule,
    TenantsModule,
    BookingsModule,
    CatalogModule,
    AvailabilityModule,
    PaymentsModule,
    BillingModule,
    NotificationsModule,
    IntegrationsModule,
    WebhooksModule,
    AuditModule,
    AdminModule,
    SearchModule,
    StorageModule,
    HealthModule,
  ],
  controllers: [ContactController],
})
export class AppModule {}
