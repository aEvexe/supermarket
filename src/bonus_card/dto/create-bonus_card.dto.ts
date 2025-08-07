// src/dto/create-bonus-card.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsNumber } from "class-validator";

export class CreateBonusCardDto {
  @ApiProperty()
  @IsInt()
  customer_id: number;

  @ApiProperty()
  @IsString()
  card_number: string;

  @ApiProperty()
  @IsNumber()
  points: number;
}
