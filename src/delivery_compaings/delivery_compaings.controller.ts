// src/controllers/delivery-company.controller.ts
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
import { DeliveryCompanyService } from "./delivery_compaings.service";
import { CreateDeliveryCompanyDto } from "./dto/create-delivery_compaing.dto";
import { UpdateDeliveryCompaingDto } from "./dto/update-delivery_compaing.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";

@ApiTags("Delivery Companies")
@Controller("delivery-companies")
export class DeliveryCompanyController {
  constructor(
    private readonly deliveryCompanyService: DeliveryCompanyService
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Get()
  @ApiOperation({ summary: "Get all delivery companies" })
  @ApiResponse({ status: 200, description: "List of delivery companies." })
  findAll() {
    return this.deliveryCompanyService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Get(":id")
  @ApiOperation({ summary: "Get delivery company by ID" })
  @ApiResponse({ status: 200, description: "Delivery company found." })
  findOne(@Param("id") id: string) {
    return this.deliveryCompanyService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Post()
  @ApiOperation({ summary: "Create delivery company" })
  @ApiResponse({ status: 201, description: "Delivery company created." })
  create(@Body() createDto: CreateDeliveryCompanyDto) {
    return this.deliveryCompanyService.create(createDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Patch(":id")
  @ApiOperation({ summary: "Update delivery company" })
  @ApiResponse({ status: 200, description: "Delivery company updated." })
  update(
    @Param("id") id: string,
    @Body() updateDto: UpdateDeliveryCompaingDto
  ) {
    return this.deliveryCompanyService.update(+id, updateDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Delete(":id")
  @ApiOperation({ summary: "Delete delivery company" })
  @ApiResponse({ status: 200, description: "Delivery company deleted." })
  remove(@Param("id") id: string) {
    return this.deliveryCompanyService.remove(+id);
  }
}
