import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateDeliveryCompanyDto } from "./dto/create-delivery_compaing.dto";
import { UpdateDeliveryCompaingDto } from "./dto/update-delivery_compaing.dto";

@Injectable()
export class DeliveryCompanyService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateDeliveryCompanyDto) {
    return this.prisma.deliveryCompany.create({ data });
  }

  findAll() {
    return this.prisma.deliveryCompany.findMany();
  }

  findOne(id: number) {
    return this.prisma.deliveryCompany.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateDeliveryCompaingDto) {
    return this.prisma.deliveryCompany.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.deliveryCompany.delete({ where: { id } });
  }
}
