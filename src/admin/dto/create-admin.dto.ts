import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsEmail, IsOptional, IsBoolean } from "class-validator";

export class CreateAdminDto {
  @ApiProperty()
  @IsString()
  name: string;

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
  is_creator?: boolean;
}
