// src/controllers/order-item.controller.ts
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
import { CreateOrderItemDto } from "./dto/create-order_item.dto";
import { UpdateOrderItemDto } from "./dto/update-order_item.dto";
import { OrderItemsService } from "./order_items.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";

@ApiTags("Order Items")
@Controller("order-items")
export class OrderItemController {
  constructor(private readonly orderItemsService: OrderItemsService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Get()
  @ApiOperation({ summary: "Get all order items" })
  @ApiResponse({ status: 200, description: "List of order items." })
  findAll() {
    return this.orderItemsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Get(":id")
  @ApiOperation({ summary: "Get order item by ID" })
  @ApiResponse({ status: 200, description: "Order item found." })
  findOne(@Param("id") id: string) {
    return this.orderItemsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Post()
  @ApiOperation({ summary: "Create order item" })
  @ApiResponse({ status: 201, description: "Order item created." })
  create(@Body() createDto: CreateOrderItemDto) {
    return this.orderItemsService.create(createDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Patch(":id")
  @ApiOperation({ summary: "Update order item" })
  @ApiResponse({ status: 200, description: "Order item updated." })
  update(@Param("id") id: string, @Body() updateDto: UpdateOrderItemDto) {
    return this.orderItemsService.update(+id, updateDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Delete(":id")
  @ApiOperation({ summary: "Delete order item" })
  @ApiResponse({ status: 200, description: "Order item deleted." })
  remove(@Param("id") id: string) {
    return this.orderItemsService.remove(+id);
  }
}
