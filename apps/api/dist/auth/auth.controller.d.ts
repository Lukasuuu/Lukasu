import { AuthService } from './auth.service';
declare class LoginDto {
    email: string;
    password: string;
}
declare class RegisterDto {
    email: string;
    password: string;
    name: string;
    tenantId?: string;
}
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
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
    register(dto: RegisterDto): Promise<{
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
export {};
