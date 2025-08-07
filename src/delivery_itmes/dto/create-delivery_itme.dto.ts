// src/dto/create-delivery-item.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber } from "class-validator";

export class CreateDeliveryItemDto {
  @ApiProperty()
  @IsInt()
  delivery_id: number;

  @ApiProperty()
  @IsInt()
  product_id: number;

  @ApiProperty()
  @IsInt()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  cost_price: number;
}

