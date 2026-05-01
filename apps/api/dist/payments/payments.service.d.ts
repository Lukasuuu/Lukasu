import { PrismaService } from '../prisma/prisma.service';
export declare class PaymentsService {
    private prisma;
    constructor(prisma: PrismaService);
    findByTenant(tenantId: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        status: string;
        bookingId: string;
        amount: import("@prisma/client/runtime/library").Decimal;
        currency: string;
        provider: string;
        providerRef: string | null;
        paidAt: Date | null;
    }[]>;
}
