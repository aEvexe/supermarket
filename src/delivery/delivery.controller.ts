// src/controllers/delivery.controller.ts
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
import { CreateDeliveryDto } from "./dto/create-delivery.dto";
import { UpdateDeliveryDto } from "./dto/update-delivery.dto";
import { DeliveryService } from "./delivery.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";

@ApiTags("Deliveries")
@Controller("deliveries")
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Get()
  @ApiOperation({ summary: "Get all deliveries" })
  @ApiResponse({ status: 200, description: "List of deliveries." })
  findAll() {
    return this.deliveryService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Get(":id")
  @ApiOperation({ summary: "Get delivery by ID" })
  @ApiResponse({ status: 200, description: "Delivery found." })
  findOne(@Param("id") id: string) {
    return this.deliveryService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Post()
  @ApiOperation({ summary: "Create delivery" })
  @ApiResponse({ status: 201, description: "Delivery created." })
  create(@Body() createDto: CreateDeliveryDto) {
    return this.deliveryService.create(createDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Patch(":id")
  @ApiOperation({ summary: "Update delivery" })
  @ApiResponse({ status: 200, description: "Delivery updated." })
  update(@Param("id") id: string, @Body() updateDto: UpdateDeliveryDto) {
    return this.deliveryService.update(+id, updateDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Delete(":id")
  @ApiOperation({ summary: "Delete delivery" })
  @ApiResponse({ status: 200, description: "Delivery deleted." })
  remove(@Param("id") id: string) {
    return this.deliveryService.remove(+id);
  }
}
