import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import { Response } from "express";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { MailService } from "../mail/mail.service";
import { Customer, Manager } from "@prisma/client";
import { SigninCustomerDto } from "../customers/dto/signin-customer.dto";
import { CreateCustomerDto } from "../customers/dto/create-customer.dto";
import { ManagerService } from "../manager/manager.service";
import { CreateManagerDto } from "../manager/dto/create-manager.dto";
import { SigninManagerDto } from "../manager/dto/signin-manager.dto";

@Injectable()
export class ManagerAuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly managerService: ManagerService,
    private readonly mailService: MailService,
  ) {}

  async generateToken(user: Manager) {
    const payload = {
      id: user.id,
      email: user.email,
      role: "manager"
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

  async signup(CreateManagerDto: CreateManagerDto) {
    const { email, password, ...rest } = CreateManagerDto;

    const existingManager = await this.prismaService.manager.findUnique({
      where: { email },
    });

    if (existingManager) {
      throw new ConflictException('This manager already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newManager = await this.prismaService.manager.create({
      data: {
        ...rest,
        email,
        hashedPassword,
      },
    });

    return {
      message: 'Manager signed up.',
      userId: newManager.id,
    };
  }

  async signin(SigninManagerDto: SigninManagerDto, res: Response) {
    const { email, password } = SigninManagerDto;
    const manager = await this.prismaService.manager.findUnique({
      where: { email },
    });

    if (!manager) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatched = await bcrypt.compare(password, manager.hashedPassword!);
    if (!isMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { accessToken, refreshToken } = await this.generateToken(manager);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);

    await this.prismaService.manager.update({
      where: { id: manager.id },
      data: { hashedRefreshToken },
    });

    res.cookie('refreshToken', refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return {
      message: 'Manager tizimga kirdi',
      userId: manager.id,
      accessToken,
    };
  }

  async signout(userId: number, res: Response) {
    const manager = await this.prismaService.manager.updateMany({
      where: {
        id: Number(userId), // convert to number
        hashedRefreshToken: { not: null },
      },
      data: { hashedRefreshToken: null },
    });

    if (!manager) throw new ForbiddenException('access denied');
    res.clearCookie('refreshToken');
    return { message: 'manager signed out' };
  }

  async refreshToken(
    userId: number,
    refreshTokenFromCookie: string,
    res: Response,
  ) {
    const decodedToken: any = this.jwtService.decode(refreshTokenFromCookie);
    if (!decodedToken || decodedToken.id !== userId) {
      throw new ForbiddenException('Not allowed');
    }

    const manager = await this.prismaService.manager.findUnique({
      where: { id: userId },
    });
    if (!manager || !manager.hashedRefreshToken) {
      throw new NotFoundException('User not found or refresh token missing');
    }

    const tokenMatch = await bcrypt.compare(
      refreshTokenFromCookie,
      manager.hashedRefreshToken,
    );
    if (!tokenMatch) throw new ForbiddenException('Forbidden');

    const { accessToken, refreshToken } = await this.generateToken(manager);
    const newHashedRefreshToken = await bcrypt.hash(refreshToken, 7);

    await this.prismaService.customer.update({
      where: { id: manager.id },
      data: { hashedRefreshToken: newHashedRefreshToken },
    });

    res.cookie('refreshToken', refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return { message: 'Token refreshed', userId: manager.id, accessToken };
  }
}
