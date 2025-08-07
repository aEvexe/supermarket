// src/dto/create-delivery.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsDateString } from "class-validator";

export class CreateDeliveryDto {
  @ApiProperty()
  @IsInt()
  order_id: number;

  @ApiProperty()
  @IsInt()
  delivery_company_id: number;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsDateString()
  delivery_date: string;

  @ApiProperty()
  @IsString()
  tracking_number: string;
}

