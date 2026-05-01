import { PrismaService } from '../prisma/prisma.service';
export declare class NotificationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, type: string, channel: string, payload?: object): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        userId: string;
        type: string;
        channel: string;
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        sentAt: Date | null;
    }>;
}
