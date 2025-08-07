import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsInt, IsDecimal, IsOptional } from "class-validator";

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  manager_id: number;

  @ApiProperty()
  @IsInt()
  category_id: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  @IsInt()
  stock_quantity: number;

  @ApiProperty()
  @IsString()
  barcode: string;
}
