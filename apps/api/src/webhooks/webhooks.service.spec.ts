import { Test, TestingModule } from '@nestjs/testing';
import { WebhooksService } from './webhooks.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  payment: {
    upsert: jest.fn(),
    updateMany: jest.fn(),
    findMany: jest.fn(),
  },
  user: {
    updateMany: jest.fn(),
  },
};

describe('WebhooksService', () => {
  let service: WebhooksService;

  beforeEach(async () => {
    jest.clearAllMocks();
    delete process.env.STRIPE_SECRET_KEY;
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebhooksService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<WebhooksService>(WebhooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('handleStripeWebhook', () => {
    it('should throw when Stripe is not configured', async () => {
      await expect(service.handleStripeWebhook(Buffer.from('{}'), 'sig')).rejects.toThrow(
        'Stripe not configured',
      );
    });
  });
});
