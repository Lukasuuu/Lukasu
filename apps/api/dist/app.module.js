"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const tenants_module_1 = require("./tenants/tenants.module");
const bookings_module_1 = require("./bookings/bookings.module");
const catalog_module_1 = require("./catalog/catalog.module");
const availability_module_1 = require("./availability/availability.module");
const payments_module_1 = require("./payments/payments.module");
const billing_module_1 = require("./billing/billing.module");
const notifications_module_1 = require("./notifications/notifications.module");
const integrations_module_1 = require("./integrations/integrations.module");
const webhooks_module_1 = require("./webhooks/webhooks.module");
const audit_module_1 = require("./audit/audit.module");
const admin_module_1 = require("./admin/admin.module");
const search_module_1 = require("./search/search.module");
const storage_module_1 = require("./storage/storage.module");
const health_module_1 = require("./health/health.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            throttler_1.ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            tenants_module_1.TenantsModule,
            bookings_module_1.BookingsModule,
            catalog_module_1.CatalogModule,
            availability_module_1.AvailabilityModule,
            payments_module_1.PaymentsModule,
            billing_module_1.BillingModule,
            notifications_module_1.NotificationsModule,
            integrations_module_1.IntegrationsModule,
            webhooks_module_1.WebhooksModule,
            audit_module_1.AuditModule,
            admin_module_1.AdminModule,
            search_module_1.SearchModule,
            storage_module_1.StorageModule,
            health_module_1.HealthModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map