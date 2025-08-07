// src/dto/create-delivery-company.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateDeliveryCompanyDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsString()
  description: string;
}
