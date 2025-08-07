import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDiscountDto } from "./dto/create-discount.dto";
import { UpdateDiscountDto } from "./dto/update-discount.dto";

@Injectable()
export class DiscountService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateDiscountDto) {
    return this.prisma.discount.create({ data: dto });
  }

  findAll() {
    return this.prisma.discount.findMany({ include: { product: true } });
  }

  async findOne(id: number) {
    const discount = await this.prisma.discount.findUnique({
      where: { id },
      include: { product: true },
    });
    if (!discount) throw new NotFoundException(`Discount #${id} not found`);
    return discount;
  }

  async update(id: number, dto: UpdateDiscountDto) {
    await this.findOne(id);
    return this.prisma.discount.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.discount.delete({ where: { id } });
  }
}
