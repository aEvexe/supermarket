import {
  Controller,
  Post,
  Body,
  Res,
  Param,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from "./auth.service";
import { ParseIntPipe } from "@nestjs/common";
import type { Response } from "express";
import { CookieGetter } from "../common/decorators/cookie-getter.decorator";
import { CreateCustomerDto } from "../customers/dto/create-customer.dto";
import { SigninCustomerDto } from "../customers/dto/signin-customer.dto";
import { JwtService } from '@nestjs/jwt';

@Controller("customer-auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService
  ) {}

  @Post("register")
  async singup(@Body() createUserDto: CreateCustomerDto) {
    return this.authService.signup(createUserDto);
  }

  @Post("singin")
  async singin(
    @Body() SigninCustomerDto: SigninCustomerDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signin(SigninCustomerDto, res);
  }

  @Post(":id/signout")
  signout(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signout(id, res);
  }

  @Post(":id/refresh")
  refresh(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(id, refreshToken, res);
  }
}
