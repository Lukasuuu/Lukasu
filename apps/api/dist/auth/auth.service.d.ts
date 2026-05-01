import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<{
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
    login(email: string, password: string): Promise<{
        accessToken: string;
        user: {
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
        };
    }>;
    register(email: string, password: string, name: string, tenantId?: string): Promise<{
        accessToken: string;
        user: {
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
        };
    }>;
}
