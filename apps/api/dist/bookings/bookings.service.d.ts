import { PrismaService } from '../prisma/prisma.service';
export declare class BookingsService {
    private prisma;
    constructor(prisma: PrismaService);
    findByTenant(tenantId: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        catalogItemId: string;
        userId: string | null;
        customerEmail: string;
        customerName: string | null;
        startTime: Date;
        endTime: Date;
        notes: string | null;
    }[]>;
    create(data: {
        tenantId: string;
        catalogItemId: string;
        customerEmail: string;
        customerName?: string;
        startTime: Date;
        endTime: Date;
        notes?: string;
    }): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        catalogItemId: string;
        userId: string | null;
        customerEmail: string;
        customerName: string | null;
        startTime: Date;
        endTime: Date;
        notes: string | null;
    }>;
}
