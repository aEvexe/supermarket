import { PartialType } from "@nestjs/mapped-types";
import { CreateAdminDto } from "./create-admin.dto";
import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateAdminDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  hashedPassword?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  hashedRefreshToken?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  refresh_token?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  is_creator?: boolean;
}