import { PrismaService } from '../prisma/prisma.service';
export declare class SearchService {
    private prisma;
    constructor(prisma: PrismaService);
    searchBookings(tenantId: string, query: string): Promise<{
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
}
