// src/dto/create-payment.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsNumber, IsDateString } from "class-validator";

export class CreatePaymentDto {
  @ApiProperty()
  @IsInt()
  order_id: number;

  @ApiProperty()
  @IsString()
  payment_method: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsDateString()
  payment_date: string;
}


