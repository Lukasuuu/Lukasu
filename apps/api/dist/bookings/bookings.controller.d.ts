import { BookingsService } from './bookings.service';
declare class CreateBookingDto {
    catalogItemId: string;
    customerEmail: string;
    customerName?: string;
    startTime: Date;
    endTime: Date;
    notes?: string;
}
export declare class BookingsController {
    private bookingsService;
    constructor(bookingsService: BookingsService);
    findAll(tenantId: string): Promise<{
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
    create(dto: CreateBookingDto, tenantId: string): Promise<{
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
    }>;
}
export {};
