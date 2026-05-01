import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn().mockResolvedValue('$2a$12$hashedpassword'),
}));

const mockUser = {
  id: 'user-1',
  email: 'test@bookme.pt',
  password: '$2a$12$hashedpassword',
  name: 'Test User',
  role: 'user',
  tenantId: 'tenant-1',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
};

const mockJwtService = {
  sign: jest.fn().mockReturnValue('mock-jwt-token'),
};

describe('AuthService', () => {
  let service: AuthService;
  let bcrypt: any;

  beforeEach(async () => {
    jest.clearAllMocks();
    bcrypt = await import('bcryptjs');
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user when credentials are valid', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);

      const result = await service.validateUser('test@bookme.pt', 'password123');
      expect(result).toBeDefined();
      expect(result?.email).toBe('test@bookme.pt');
    });

    it('should return null when user not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      const result = await service.validateUser('unknown@bookme.pt', 'password');
      expect(result).toBeNull();
    });

    it('should return null when password is invalid', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      const result = await service.validateUser('test@bookme.pt', 'wrongpassword');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return accessToken and user on valid login', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);

      const result = await service.login('test@bookme.pt', 'password123');
      expect(result.accessToken).toBe('mock-jwt-token');
      expect(result.user).toBeDefined();
    });

    it('should throw UnauthorizedException on invalid credentials', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      await expect(service.login('test@bookme.pt', 'wrong')).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('register', () => {
    it('should create user and return accessToken', async () => {
      mockPrisma.user.create.mockResolvedValue(mockUser);

      const result = await service.register('test@bookme.pt', 'password123', 'Test User', 'tenant-1');
      expect(result.accessToken).toBe('mock-jwt-token');
      expect(result.user).toBeDefined();
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          email: 'test@bookme.pt',
          name: 'Test User',
          tenantId: 'tenant-1',
        }),
      });
    });
  });

  describe('findById', () => {
    it('should return user without password', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'user-1',
        email: 'test@bookme.pt',
        name: 'Test User',
        role: 'user',
        tenantId: 'tenant-1',
      });

      const result = await service.findById('user-1');
      expect(result).toBeDefined();
      expect(result?.email).toBe('test@bookme.pt');
    });
  });
});
