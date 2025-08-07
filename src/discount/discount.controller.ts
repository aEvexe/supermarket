// src/controllers/discount.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateDiscountDto } from "./dto/create-discount.dto";
import { UpdateDiscountDto } from "./dto/update-discount.dto";
import { DiscountService } from "./discount.service";

@ApiTags("Discounts")
@Controller("discounts")
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}
  @Get()
  @ApiOperation({ summary: "Get all discounts" })
  @ApiResponse({ status: 200, description: "List of discounts." })
  findAll() {
    return this.discountService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get discount by ID" })
  @ApiResponse({ status: 200, description: "Discount found." })
  findOne(@Param("id") id: string) {
    return this.discountService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: "Create discount" })
  @ApiResponse({ status: 201, description: "Discount created." })
  create(@Body() createDto: CreateDiscountDto) {
    return this.discountService.create(createDto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update discount" })
  @ApiResponse({ status: 200, description: "Discount updated." })
  update(@Param("id") id: string, @Body() updateDto: UpdateDiscountDto) {
    return this.discountService.update(+id, updateDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete discount" })
  @ApiResponse({ status: 200, description: "Discount deleted." })
  remove(@Param("id") id: string) {
    return this.discountService.remove(+id);
  }
}
