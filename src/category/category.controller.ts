// src/controllers/category.controller.ts
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
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { CategoryService } from "./category.service";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";

@ApiTags("Categories")
@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Get()
  @ApiOperation({ summary: "Get all categories" })
  @ApiResponse({ status: 200, description: "List of categories." })
  findAll() {
    return this.categoryService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Get(":id")
  @ApiOperation({ summary: "Get category by ID" })
  @ApiResponse({ status: 200, description: "Category found." })
  findOne(@Param("id") id: string) {
    return this.categoryService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Post()
  @ApiOperation({ summary: "Create category" })
  @ApiResponse({ status: 201, description: "Category created." })
  create(@Body() createDto: CreateCategoryDto) {
    return this.categoryService.create(createDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Patch(":id")
  @ApiOperation({ summary: "Update category" })
  @ApiResponse({ status: 200, description: "Category updated." })
  update(@Param("id") id: string, @Body() updateDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "manager")
  @Delete(":id")
  @ApiOperation({ summary: "Delete category" })
  @ApiResponse({ status: 200, description: "Category deleted." })
  remove(@Param("id") id: string) {
    return this.categoryService.remove(+id);
  }
}
