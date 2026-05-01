import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) return null;
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const payload = { sub: user.id, email: user.email, role: user.role, tenantId: user.tenantId };
    return { accessToken: this.jwtService.sign(payload), user };
  }

  async register(email: string, password: string, name: string, tenantId?: string) {
    const hash = await bcrypt.hash(password, 12);
    const user = await this.prisma.user.create({
      data: { email, password: hash, name, tenantId: tenantId || undefined },
    });
    const payload = { sub: user.id, email: user.email, role: user.role, tenantId: user.tenantId };
    return { accessToken: this.jwtService.sign(payload), user };
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatarUrl: true,
        tenantId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
