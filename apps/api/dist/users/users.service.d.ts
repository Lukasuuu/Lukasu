import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<{
        id: string;
        email: string;
        password: string | null;
        name: string | null;
        role: string;
        avatarUrl: string | null;
        tenantId: string;
        emailVerified: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        id: string;
        email: string;
        password: string | null;
        name: string | null;
        role: string;
        avatarUrl: string | null;
        tenantId: string;
        emailVerified: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByTenant(tenantId: string): Promise<{
        id: string;
        email: string;
        password: string | null;
        name: string | null;
        role: string;
        avatarUrl: string | null;
        tenantId: string;
        emailVerified: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
