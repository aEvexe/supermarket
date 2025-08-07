  // src/controllers/return.controller.ts
  import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    UseGuards,
    Body,
  } from "@nestjs/common";
  import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
  import { CreateReturnDto } from "./dto/create-return.dto";
  import { UpdateReturnDto } from "./dto/update-return.dto";
  import { PaymentService } from "../payment/payment.service";
  import { ReturnService } from "./returns.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";

  @ApiTags("Returns")
  @Controller("returns")
  export class ReturnController {
    constructor(private readonly returnsService: ReturnService) {}
    @Get()
    @ApiOperation({ summary: "Get all returns" })
    @ApiResponse({ status: 200, description: "List of returns." })
    findAll() {
      return "This action returns all returns";
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("admin", "manager")
    @Get(":id")
    @ApiOperation({ summary: "Get return by ID" })
    @ApiResponse({ status: 200, description: "Return found." })
    findOne(@Param("id") id: string) {
      return this.returnsService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("admin", "manager")
    @Post()
    @ApiOperation({ summary: "Create return" })
    @ApiResponse({ status: 201, description: "Return created." })
    create(@Body() createDto: CreateReturnDto) {
      return this.returnsService.create(createDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("admin", "manager")
    @Patch(":id")
    @ApiOperation({ summary: "Update return" })
    @ApiResponse({ status: 200, description: "Return updated." })
    update(@Param("id") id: string, @Body() updateDto: UpdateReturnDto) {
      return this.returnsService.update(+id, updateDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("admin", "manager")
    @Delete(":id")
    @ApiOperation({ summary: "Delete return" })
    @ApiResponse({ status: 200, description: "Return deleted." })
    remove(@Param("id") id: string) {
      return this.returnsService.remove(+id);
    }
  }
