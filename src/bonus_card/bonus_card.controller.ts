// src/controllers/bonus-card.controller.ts
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
import { BonusCardService } from "./bonus_card.service";
import { CreateBonusCardDto } from "./dto/create-bonus_card.dto";
import { UpdateBonusCardDto } from "./dto/update-bonus_card.dto";

@ApiTags("Bonus Cards")
@Controller("bonus-cards")
export class BonusCardController {
  constructor(private readonly bonusCardService: BonusCardService) {}

  @Get()
  @ApiOperation({ summary: "Get all bonus cards" })
  @ApiResponse({ status: 200, description: "List of bonus cards." })
  findAll() {
    return this.bonusCardService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get bonus card by ID" })
  @ApiResponse({ status: 200, description: "Bonus card found." })
  findOne(@Param("id") id: string) {
    return this.bonusCardService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: "Create bonus card" })
  @ApiResponse({ status: 201, description: "Bonus card created." })
  create(@Body() createDto: CreateBonusCardDto) {
    return this.bonusCardService.create(createDto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update bonus card" })
  @ApiResponse({ status: 200, description: "Bonus card updated." })
  update(@Param("id") id: string, @Body() updateDto: UpdateBonusCardDto) {
    return this.bonusCardService.update(+id, updateDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete bonus card" })
  @ApiResponse({ status: 200, description: "Bonus card deleted." })
  remove(@Param("id") id: string) {
    return this.bonusCardService.remove(+id);
  }
}
