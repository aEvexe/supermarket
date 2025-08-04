import {
  Controller,
  Post,
  Body,
  Res,
  Param,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { ManagerAuthService } from './auth.service';
import { ParseIntPipe } from "@nestjs/common";
import type { Response } from "express";
import { CookieGetter } from "../common/decorators/cookie-getter.decorator";
import { CreateCustomerDto } from "../customers/dto/create-customer.dto";
import { SigninCustomerDto } from "../customers/dto/signin-customer.dto";
import { JwtService } from '@nestjs/jwt';
import { CreateManagerDto } from '../manager/dto/create-manager.dto';
import { SigninManagerDto } from '../manager/dto/signin-manager.dto';

@Controller('manager-auth')
export class AuthController {
  constructor(
    private readonly authService: ManagerAuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async singup(@Body() createManagerDto: CreateManagerDto) {
    return this.authService.signup(createManagerDto);
  }

  @Post('singin')
  async singin(
    @Body() SigninManagerDto: SigninManagerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signin(SigninManagerDto, res);
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

  @Post(':id/refresh')
  refresh(
    @Param('id', ParseIntPipe) id: number,
    @CookieGetter('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshToken(id, refreshToken, res);
  }
}
