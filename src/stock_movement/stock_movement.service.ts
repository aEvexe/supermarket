import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateStockMovementDto } from "./dto/create-stock_movement.dto";
import { UpdateStockMovementDto } from "./dto/update-stock_movement.dto";


@Injectable()
export class StockMovementService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateStockMovementDto) {
    return this.prisma.stockMovement.create({ data: dto });
  }

  async findAll() {
    return this.prisma.stockMovement.findMany({
      include: { product: true, warehouse: true },
    });
  }

  async findOne(id: number) {
    const movement = await this.prisma.stockMovement.findUnique({
      where: { id },
      include: { product: true, warehouse: true },
    });
    if (!movement)
      throw new NotFoundException(`StockMovement with id ${id} not found`);
    return movement;
  }

  async update(id: number, dto: UpdateStockMovementDto) {
    await this.findOne(id);
    return this.prisma.stockMovement.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.stockMovement.delete({ where: { id } });
  }
}
