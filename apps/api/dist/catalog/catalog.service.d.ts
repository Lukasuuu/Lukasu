import { PrismaService } from '../prisma/prisma.service';
export declare class CatalogService {
    private prisma;
    constructor(prisma: PrismaService);
    findByTenant(tenantId: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        duration: number;
        price: import("@prisma/client/runtime/library").Decimal;
        color: string | null;
        isActive: boolean;
    }[]>;
}
