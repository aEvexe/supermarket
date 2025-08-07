// src/dto/discount.dto.ts
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString, IsInt, IsDateString, IsNumber } from "class-validator";

export class CreateDiscountDto {
  @ApiProperty()
  @IsInt()
  product_id: number;

  @ApiProperty()
  @IsString()
  discount_type: string;

  @ApiProperty()
  @IsNumber()
  value: number;

  @ApiProperty()
  @IsDateString()
  start_date: string;

  @ApiProperty()
  @IsDateString()
  end_date: string;
}

