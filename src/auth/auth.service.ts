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
import { Customer } from "@prisma/client";
import { SigninCustomerDto } from "../customers/dto/signin-customer.dto";
import { CreateCustomerDto } from "../customers/dto/create-customer.dto";
import { CustomersService } from "../customers/customers.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly customersService: CustomersService,
    private readonly mailService: MailService,
  ) {}

  async generateToken(user: Customer) {
    const payload = {
      id: user.id,
      email: user.email,
      is_active: user.is_active,
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

  async signup(createCustomerDto: CreateCustomerDto) {
    const { email, password, ...rest } = createCustomerDto;

    const existingUser = await this.prismaService.customer.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('This user already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const activationLink = uuidv4();

    const newUser = await this.prismaService.customer.create({
      data: {
        ...rest,
        email,
        hashedPassword,
        activation_link: activationLink,
      },
    });

    await this.mailService.sendMail(newUser);

    return {
      message: 'Customer signed up. Check your email to activate your account.',
      userId: newUser.id,
      activationLink,
    };
  }

  async signin(SigninCustomerDto: SigninCustomerDto, res: Response) {
    const { email, password } = SigninCustomerDto;
    const user = await this.prismaService.customer.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isMatched = await bcrypt.compare(password, user.hashedPassword!);
    if (!isMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const { accessToken, refreshToken } = await this.generateToken(user);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);

    await this.prismaService.customer.update({
      where: { id: user.id },
      data: { hashedRefreshToken },
    });

    res.cookie('refreshToken', refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return {
      message: 'Foydanaluvchi tizimga qoshildi',
      userId: user.id,
      accessToken,
    };
  }

  async signout(userId: number, res: Response) {
    const customer = await this.prismaService.admin.updateMany({
      where: {
        id: Number(userId), // convert to number
        hashedRefreshToken: { not: null },
      },
      data: { hashedRefreshToken: null },
    });

    if (!customer) throw new ForbiddenException('access denied');
    res.clearCookie('refreshToken');
    return { message: 'User signed out' };
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

    const user = await this.prismaService.customer.findUnique({
      where: { id: userId },
    });
    if (!user || !user.hashedRefreshToken) {
      throw new NotFoundException('User not found or refresh token missing');
    }

    const tokenMatch = await bcrypt.compare(
      refreshTokenFromCookie,
      user.hashedRefreshToken,
    );
    if (!tokenMatch) throw new ForbiddenException('Forbidden');

    const { accessToken, refreshToken } = await this.generateToken(user);
    const newHashedRefreshToken = await bcrypt.hash(refreshToken, 7);

    await this.prismaService.customer.update({
      where: { id: user.id },
      data: { hashedRefreshToken: newHashedRefreshToken },
    });

    res.cookie('refreshToken', refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return { message: 'Token refreshed', userId: user.id, accessToken };
  }
}
