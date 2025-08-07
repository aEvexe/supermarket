// src/dto/category.dto.ts
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString, IsInt } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsInt()
  manager_id: number;
}

