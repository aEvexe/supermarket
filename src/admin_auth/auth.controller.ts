import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { ParseIntPipe } from "@nestjs/common";
import { SigninAdminDto } from "../admin/dto/signin-admin.dto";
import type { Response } from "express";
import { CookieGetter } from "../common/decorators/cookie-getter.decorator";
import { AdminAuthService } from "./auth.service";
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AdminAuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.signup(createAdminDto);
  }

  @Post('login')
  async login(
    @Body() signinAdminDto: SigninAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signin(signinAdminDto, res);
  }

  @Post('signout')
  signout(
    @CookieGetter('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const decoded: any = this.jwtService.decode(refreshToken);
    if (!decoded?.id) throw new UnauthorizedException();
    return this.authService.signout(decoded.id, res);
  }

  @HttpCode(200)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: number,
    @CookieGetter('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshToken(id, refreshToken, res);
  }
}
