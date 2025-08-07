import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateOrderDto) {
    return this.prisma.order.create({ data: dto });
  }

  findAll() {
    return this.prisma.order.findMany({
      include: { customer: true, order_items: true, payments: true },
    });
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { customer: true },
    });
    if (!order) throw new NotFoundException(`Order #${id} not found`);
    return order;
  }

  async update(id: number, dto: UpdateOrderDto) {
    await this.findOne(id);
    return this.prisma.order.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.order.delete({ where: { id } });
  }

  async findByDateRange(startDate: string, endDate: string) {
    return this.prisma.order.findMany({
      where: {
        order_date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      include: {
        customer: true,
        order_items: true,
        payments: true,
      },
    });
  }

  async getOrdersByDeliveryCompany(deliveryCompanyId: number) {
    return this.prisma.order.findMany({
      where: {
        deliveries: {
          some: { delivery_company_id: deliveryCompanyId },
        },
      },
      include: {
        customer: true,
        deliveries: {
          include: {
            delivery_company: true,
            delivery_items: true,
          },
        },
      },
    });
  }

  async getMonthlySales() {
    return this.prisma.order.groupBy({
      by: ["order_date"],
      _sum: { total_amount: true },
      orderBy: { order_date: "asc" },
    });
  }
}
