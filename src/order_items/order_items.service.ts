import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderItemDto } from "./dto/create-order_item.dto";
import { UpdateOrderItemDto } from "./dto/update-order_item.dto";

@Injectable()
export class OrderItemsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrderItemDto) {
    return this.prisma.orderItem.create({ data: dto });
  }

  async findAll() {
    return this.prisma.orderItem.findMany({
      include: { order: true, product: true },
    });
  }

  async findOne(id: number) {
    const item = await this.prisma.orderItem.findUnique({
      where: { id },
      include: { order: true, product: true },
    });
    if (!item) throw new NotFoundException(`OrderItem with id ${id} not found`);
    return item;
  }

  async update(id: number, dto: UpdateOrderItemDto) {
    await this.findOne(id);
    return this.prisma.orderItem.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.orderItem.delete({ where: { id } });
  }
}
