// src/controllers/stock-movement.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateStockMovementDto } from "./dto/create-stock_movement.dto";
import { UpdateStockMovementDto } from "./dto/update-stock_movement.dto";
import { StockMovementService } from "./stock_movement.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";


@ApiTags("StockMovements")
@Controller("stock-movements")
export class StockMovementController {
  constructor(private readonly stockMovementService: StockMovementService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Get()
  @ApiOperation({ summary: "Get all stock movements" })
  @ApiResponse({ status: 200, description: "List of stock movements." })
  findAll() {
    return this.stockMovementService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Get(":id")
  @ApiOperation({ summary: "Get stock movement by ID" })
  @ApiResponse({ status: 200, description: "Stock movement found." })
  findOne(@Param("id") id: string) {
    return this.stockMovementService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Post()
  @ApiOperation({ summary: "Create stock movement" })
  @ApiResponse({ status: 201, description: "Stock movement created." })
  create(@Body() createDto: CreateStockMovementDto) {
    return this.stockMovementService.create(createDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Patch(":id")
  @ApiOperation({ summary: "Update stock movement" })
  @ApiResponse({ status: 200, description: "Stock movement updated." })
  update(@Param("id") id: string, @Body() updateDto: UpdateStockMovementDto) {
    return this.stockMovementService.update(+id, updateDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Delete(":id")
  @ApiOperation({ summary: "Delete stock movement" })
  @ApiResponse({ status: 200, description: "Stock movement deleted." })
  remove(@Param("id") id: string) {
    return this.stockMovementService.remove(+id);
  }
}
