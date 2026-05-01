import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findOne(id: string): Promise<{
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
}
