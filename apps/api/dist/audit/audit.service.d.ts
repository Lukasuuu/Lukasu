import { PrismaService } from '../prisma/prisma.service';
export declare class AuditService {
    private prisma;
    constructor(prisma: PrismaService);
    log(data: {
        tenantId?: string;
        userId?: string;
        action: string;
        resource: string;
        resourceId?: string;
        metadata?: object;
        ip?: string;
        userAgent?: string;
    }): Promise<{
        id: string;
        tenantId: string | null;
        createdAt: Date;
        userId: string | null;
        action: string;
        resource: string;
        resourceId: string | null;
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        ip: string | null;
        userAgent: string | null;
    }>;
}
