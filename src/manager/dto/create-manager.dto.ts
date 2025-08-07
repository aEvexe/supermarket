// src/dto/manager.dto.ts
import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsString, IsEmail, IsOptional, IsBoolean } from "class-validator";

export class CreateManagerDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  hashedRefreshToken?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  refresh_token?: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  @IsOptional()
  is_approved?: boolean;
}

