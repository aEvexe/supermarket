import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsDecimal, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  manager_id?: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  category_id?: number;

  @ApiPropertyOptional()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  stock_quantity?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  barcode?: string;
}

