// src/dto/return.dto.ts
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsInt, IsString, IsDateString } from "class-validator";

export class CreateReturnDto {
  @ApiProperty()
  @IsInt()
  product_id: number;

  @ApiProperty()
  @IsInt()
  quantity: number;

  @ApiProperty()
  @IsString()
  reason: string;

  @ApiProperty()
  @IsDateString()
  return_date: string;

  @ApiProperty()
  @IsInt()
  manager_id: number;

  @ApiProperty()
  @IsInt()
  order_id: number;
}

