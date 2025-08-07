// src/dto/order-item.dto.ts
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsInt, IsNumber } from "class-validator";

export class CreateOrderItemDto {
  @ApiProperty()
  @IsInt()
  order_id: number;

  @ApiProperty()
  @IsInt()
  product_id: number;

  @ApiProperty()
  @IsInt()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  price: number;
}

