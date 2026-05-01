import { PrismaService } from '../prisma/prisma.service';
export declare class AvailabilityService {
    private prisma;
    constructor(prisma: PrismaService);
    findByCatalogItem(catalogItemId: string): Promise<{
        id: string;
        createdAt: Date;
        catalogItemId: string;
        startTime: string;
        endTime: string;
        dayOfWeek: number;
        timezone: string;
    }[]>;
}
