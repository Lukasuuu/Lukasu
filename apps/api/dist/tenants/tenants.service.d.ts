import { PrismaService } from '../prisma/prisma.service';
export declare class TenantsService {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        domain: string | null;
        plan: string;
        status: string;
        settings: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    findBySlug(slug: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        domain: string | null;
        plan: string;
        status: string;
        settings: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
}
