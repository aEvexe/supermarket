import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  Param,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { CreateAdminDto } from "../admin/dto/create-admin.dto";
import { ParseIntPipe } from "@nestjs/common";
import { SigninAdminDto } from "../admin/dto/signin-admin.dto";
import type { Response } from "express";
import { CookieGetter } from "../common/decorators/cookie-getter.decorator";
import { AdminAuthService } from "./auth.service";
import { JwtService } from '@nestjs/jwt';
import { CreatorGuard } from '../common/guards/creator.guard';
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AdminAuthService,
    private readonly jwtService: JwtService
  ) {}

  @Post("register")
  @UseGuards(JwtAuthGuard, CreatorGuard)
  async register(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.signup(createAdminDto);
  }

  @Post("login")
  async login(
    @Body() signinAdminDto: SigninAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signin(signinAdminDto, res);
  }

  @Post(":id/signout")
  signout(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signout(id, res);
  }

  @HttpCode(200)
  @Post(":id/refresh")
  refresh(
    @Param("id") id: number,
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(id, refreshToken, res);
  }
}
