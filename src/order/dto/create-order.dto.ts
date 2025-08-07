// src/dto/order.dto.ts
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsInt, IsString, IsDateString, IsNumber } from "class-validator";

export class CreateOrderDto {
  @ApiProperty()
  @IsInt()
  customer_id: number;

  @ApiProperty()
  @IsDateString()
  order_date: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsNumber()
  total_amount: number;
}

