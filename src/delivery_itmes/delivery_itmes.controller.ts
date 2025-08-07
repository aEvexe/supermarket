// src/controllers/delivery-item.controller.ts
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
import { DeliveryItemService } from "./delivery_itmes.service";
import { CreateDeliveryItemDto } from "./dto/create-delivery_itme.dto";
import { UpdateDeliveryItmeDto } from "./dto/update-delivery_itme.dto";
import { Roles } from "../common/decorators/roles.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";


@ApiTags("Delivery Items")
@Controller("delivery-items")
export class DeliveryItemController {
  constructor(private readonly deliveryItemService: DeliveryItemService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Get()
  @ApiOperation({ summary: "Get all delivery items" })
  @ApiResponse({ status: 200, description: "List of delivery items." })
  findAll() {
    return this.deliveryItemService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Get(":id")
  @ApiOperation({ summary: "Get delivery item by ID" })
  @ApiResponse({ status: 200, description: "Delivery item found." })
  findOne(@Param("id") id: string) {
    return this.deliveryItemService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Post()
  @ApiOperation({ summary: "Create delivery item" })
  @ApiResponse({ status: 201, description: "Delivery item created." })
  create(@Body() createDto: CreateDeliveryItemDto) {
    return this.deliveryItemService.create(createDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Patch(":id")
  @ApiOperation({ summary: "Update delivery item" })
  @ApiResponse({ status: 200, description: "Delivery item updated." })
  update(@Param("id") id: string, @Body() updateDto: UpdateDeliveryItmeDto) {
    return this.deliveryItemService.update(+id, updateDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Delete(":id")
  @ApiOperation({ summary: "Delete delivery item" })
  @ApiResponse({ status: 200, description: "Delivery item deleted." })
  remove(@Param("id") id: string) {
    return this.deliveryItemService.remove(+id);
  }
}
