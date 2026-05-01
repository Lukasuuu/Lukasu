import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from './bookings.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  booking: {
    findMany: jest.fn(),
    create: jest.fn(),
  },
};

describe('BookingsService', () => {
  let service: BookingsService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByTenant', () => {
    it('should return bookings for a tenant', async () => {
      const bookings = [
        { id: 'b1', tenantId: 't1', customerEmail: 'a@a.pt' },
        { id: 'b2', tenantId: 't1', customerEmail: 'b@b.pt' },
      ];
      mockPrisma.booking.findMany.mockResolvedValue(bookings);

      const result = await service.findByTenant('t1');
      expect(result).toHaveLength(2);
      expect(mockPrisma.booking.findMany).toHaveBeenCalledWith({
        where: { tenantId: 't1' },
        orderBy: { startTime: 'asc' },
      });
    });

    it('should return empty array when no bookings', async () => {
      mockPrisma.booking.findMany.mockResolvedValue([]);
      const result = await service.findByTenant('t-empty');
      expect(result).toHaveLength(0);
    });
  });

  describe('create', () => {
    it('should create a booking', async () => {
      const booking = {
        id: 'b1',
        tenantId: 't1',
        catalogItemId: 'c1',
        customerEmail: 'a@a.pt',
        startTime: new Date(),
        endTime: new Date(),
      };
      mockPrisma.booking.create.mockResolvedValue(booking);

      const result = await service.create(booking);
      expect(result.id).toBe('b1');
      expect(mockPrisma.booking.create).toHaveBeenCalledWith({ data: booking });
    });
  });
});
