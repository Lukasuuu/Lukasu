import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  payment: {
    findMany: jest.fn(),
    upsert: jest.fn(),
    updateMany: jest.fn(),
  },
};

describe('PaymentsService', () => {
  let service: PaymentsService;

  beforeEach(async () => {
    jest.clearAllMocks();
    delete process.env.STRIPE_SECRET_KEY;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByTenant', () => {
    it('should return payments for tenant', async () => {
      const payments = [
        { id: 'p1', tenantId: 't1', amount: 100, status: 'active' },
      ];
      mockPrisma.payment.findMany.mockResolvedValue(payments);

      const result = await service.findByTenant('t1');
      expect(result).toHaveLength(1);
      expect(mockPrisma.payment.findMany).toHaveBeenCalledWith({
        where: { tenantId: 't1' },
      });
    });
  });

  describe('createCheckoutSession', () => {
    it('should throw when Stripe is not configured', async () => {
      await expect(
        service.createCheckoutSession({
          priceId: 'price_123',
          userId: 'u1',
        }),
      ).rejects.toThrow('Stripe not configured');
    });
  });

  describe('createPortalSession', () => {
    it('should throw when Stripe is not configured', async () => {
      await expect(
        service.createPortalSession({
          customerId: 'cus_123',
        }),
      ).rejects.toThrow('Stripe not configured');
    });
  });
});
