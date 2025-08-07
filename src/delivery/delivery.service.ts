import { Injectable } from "@nestjs/common";
import { CreateDeliveryDto } from "./dto/create-delivery.dto";
import { UpdateDeliveryDto } from "./dto/update-delivery.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class DeliveryService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateDeliveryDto) {
    return this.prisma.delivery.create({ data });
  }

  findAll() {
    return this.prisma.delivery.findMany({
      include: { delivery_company: true },
    });
  }

  findOne(id: number) {
    return this.prisma.delivery.findUnique({
      where: { id },
      include: { delivery_company: true },
    });
  }

  update(id: number, data: UpdateDeliveryDto) {
    return this.prisma.delivery.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.delivery.delete({ where: { id } });
  }
}
