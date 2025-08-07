import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateDeliveryItemDto } from "./dto/create-delivery_itme.dto";
import { UpdateDeliveryItmeDto } from "./dto/update-delivery_itme.dto";


@Injectable()
export class DeliveryItemService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateDeliveryItemDto) {
    return this.prisma.deliveryItem.create({ data });
  }

  findAll() {
    return this.prisma.deliveryItem.findMany({
      include: { delivery: true, product: true },
    });
  }

  findOne(id: number) {
    return this.prisma.deliveryItem.findUnique({
      where: { id },
      include: { delivery: true, product: true },
    });
  }

  update(id: number, data: UpdateDeliveryItmeDto) {
    return this.prisma.deliveryItem.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.deliveryItem.delete({ where: { id } });
  }
}
