import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '../mail/mail.service';
import { Admin } from '@prisma/client';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { SigninAdminDto } from '../admin/dto/signin-admin.dto';

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async generateToken(admin: Admin) {
    const payload = {
      id: admin.id,
      email: admin.email,
      is_creator: admin.is_creator,
      role: "admin"
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCES_TOKEN_KEY,
        expiresIn: process.env.ACCES_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async signup(createAdminDto: CreateAdminDto) {
    const { email } = createAdminDto;
    const existingAdmin = await this.prismaService.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      throw new ConflictException('This admin already exists');
    }


    const newAdmin = await this.prismaService.admin.create({
      data: {
        name: createAdminDto.name,
        email: createAdminDto.email,
        hashedPassword: await bcrypt.hash(createAdminDto.password, 10), // <-- hash here
      },
    });

    return {
      message: 'New admin created',
      adminId: newAdmin.id,
    };
  }

  async signin(signinAdminDto: SigninAdminDto, res: Response) {
    const { email, password } = signinAdminDto;
    const admin = await this.prismaService.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatched = await bcrypt.compare(password, admin.hashedPassword);
    if (!isMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { accessToken, refreshToken } = await this.generateToken(admin);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);

    await this.prismaService.admin.update({
      where: { id: admin.id },
      data: { hashedRefreshToken },
    });

    res.cookie('refreshToken', refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return {
      message: 'Admin signed in',
      userId: admin.id,
      accessToken,
    };
  }

  async signout(adminId: number, res: Response) {
    const admin = await this.prismaService.admin.updateMany({
      where: {
        id: Number(adminId), // convert to number
        hashedRefreshToken: { not: null },
      },
      data: { hashedRefreshToken: null },
    });
    if (!admin) throw new ForbiddenException('Access denied');
    res.clearCookie('admin_refreshToken');
    return { message: 'Admin signed out' };
  }

  async refreshToken(
    adminId: number,
    refreshTokenFromCookie: string,
    res: Response,
  ) {
    const decodedToken: any = this.jwtService.decode(refreshTokenFromCookie);
    if (!decodedToken || decodedToken.id !== Number(adminId)) {
      // also cast here
      throw new ForbiddenException('Not allowed');
    }

    const admin = await this.prismaService.admin.findUnique({
      where: { id: Number(adminId) }, // convert to number
    });
    if (!admin || !admin.hashedRefreshToken) {
      throw new NotFoundException('Admin not found or refresh token missing');
    }

    const tokenMatch = await bcrypt.compare(
      refreshTokenFromCookie,
      admin.hashedRefreshToken,
    );
    if (!tokenMatch) throw new ForbiddenException('Forbidden');

    const { accessToken, refreshToken } = await this.generateToken(admin);
    const newHashedRefreshToken = await bcrypt.hash(refreshToken, 7);

    await this.prismaService.admin.update({
      where: { id: Number(admin.id) }, // convert to number
      data: { hashedRefreshToken: newHashedRefreshToken },
    });

    res.cookie('refreshToken', refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return { message: 'Admin token refreshed', userId: admin.id, accessToken };
  }
}
