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
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { CustomersService } from "./customers.service";
import { UpdatePaymentDto } from "../payment/dto/update-payment.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";

@ApiTags("Customers")
@Controller("customers")
export class CustomerController {
  constructor(private readonly customersService: CustomersService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Get()
  @ApiOperation({ summary: "Get all customers" })
  @ApiResponse({ status: 200, description: "List of customers." })
  findAll() {
    return this.customersService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Get(":id")
  @ApiOperation({ summary: "Get customer by ID" })
  @ApiResponse({ status: 200, description: "Customer found." })
  findOne(@Param("id") id: string) {
    return this.customersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Post()
  @ApiOperation({ summary: "Create customer" })
  @ApiResponse({ status: 201, description: "Customer created." })
  create(@Body() createDto: CreateCustomerDto) {
    return this.customersService.create(createDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Patch(":id")
  @ApiOperation({ summary: "Update customer" })
  @ApiResponse({ status: 200, description: "Customer updated." })
  update(@Param("id") id: string, @Body() updateDto: UpdateCustomerDto) {
    return this.customersService.update(+id, updateDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  @Delete(":id")
  @ApiOperation({ summary: "Delete customer" })
  @ApiResponse({ status: 200, description: "Customer deleted." })
  remove(@Param("id") id: string) {
    return this.customersService.remove(+id);
  }
}
