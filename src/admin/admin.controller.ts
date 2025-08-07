import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CreatorGuard } from '../common/guards/creator.guard';

@ApiTags("Admin")
@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(JwtAuthGuard, CreatorGuard)
  @Post()
  @ApiOperation({ summary: "Create new admin" })
  @ApiResponse({ status: 201, description: "Admin created successfully" })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @UseGuards(JwtAuthGuard, CreatorGuard)
  @Roles("admin")
  @Get()
  @ApiOperation({ summary: "Get all admins" })
  @ApiResponse({ status: 200, description: "List of admins returned" })
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(JwtAuthGuard, CreatorGuard)
  @Roles("admin")
  @Get(":id")
  @ApiOperation({ summary: "Get admin by ID" })
  @ApiResponse({ status: 200, description: "Admin returned" })
  findOne(@Param("id") id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, CreatorGuard)
  @Roles("admin")
  @Patch(":id")
  @ApiOperation({ summary: "Update admin by ID" })
  @ApiResponse({ status: 200, description: "Admin updated" })
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @UseGuards(JwtAuthGuard, CreatorGuard)
  @Roles("admin")
  @Delete(":id")
  @ApiOperation({ summary: "Delete admin by ID" })
  @ApiResponse({ status: 200, description: "Admin deleted" })
  remove(@Param("id") id: string) {
    return this.adminService.remove(+id);
  }
}
