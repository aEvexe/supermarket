import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString, IsInt, IsDateString } from "class-validator";

export class CreateStockMovementDto {
  @ApiProperty()
  @IsInt()
  product_id: number;

  @ApiProperty()
  @IsInt()
  warehouse_id: number;

  @ApiProperty()
  @IsString()
  movement_type: string;

  @ApiProperty()
  @IsInt()
  quantity: number;

  @ApiProperty()
  @IsDateString()
  date: string;

  @ApiProperty()
  @IsDateString()
  expire_date: string;
}

