// src/controllers/warehouse.controller.ts
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
import { CreateWarehouseDto } from "./dto/create-warehouse.dto";
import {  UpdateWarehouseDto } from "./dto/update-warehouse.dto";
import { WarehouseService } from "./warehouse.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";

@ApiTags("Warehouses")
@Controller("warehouses")
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Get()
  @ApiOperation({ summary: "Get all warehouses" })
  @ApiResponse({ status: 200, description: "List of warehouses." })
  findAll() {
    return this.warehouseService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get warehouse by ID" })
  @ApiResponse({ status: 200, description: "Warehouse found." })
  findOne(@Param("id") id: string) {
    return this.warehouseService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Post()
  @ApiOperation({ summary: "Create warehouse" })
  @ApiResponse({ status: 201, description: "Warehouse created." })
  create(@Body() createDto: CreateWarehouseDto) {
    return this.warehouseService.create(createDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Patch(":id")
  @ApiOperation({ summary: "Update warehouse" })
  @ApiResponse({ status: 200, description: "Warehouse updated." })
  update(@Param("id") id: string, @Body() updateDto: UpdateWarehouseDto) {
    return this.warehouseService.update(+id, updateDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Delete(":id")
  @ApiOperation({ summary: "Delete warehouse" })
  @ApiResponse({ status: 200, description: "Warehouse deleted." })
  remove(@Param("id") id: string) {
    return this.warehouseService.remove(+id);
  }
}
