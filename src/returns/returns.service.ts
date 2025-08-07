import { Injectable } from "@nestjs/common";
import { CreateReturnDto } from "./dto/create-return.dto";
import { UpdateReturnDto } from "./dto/update-return.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ReturnService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createReturnDto: CreateReturnDto) {
    return this.prismaService.return.create({
      data: createReturnDto,
    });
  }

  findAll() {
    return this.prismaService.return.findMany({
      include: {
        product: true,
        manager: true,
        order: true,
      },
    });
  }

  findOne(id: number) {
    return this.prismaService.return.findUnique({
      where: { id },
      include: {
        product: true,
        manager: true,
        order: true,
      },
    });
  }

  update(id: number, updateReturnDto: UpdateReturnDto) {
    return this.prismaService.return.update({
      where: { id },
      data: updateReturnDto,
    });
  }

  remove(id: number) {
    return this.prismaService.return.delete({
      where: { id },
    });
  }
}
