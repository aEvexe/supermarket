import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateBonusCardDto } from "./dto/create-bonus_card.dto";
import { UpdateBonusCardDto } from "./dto/update-bonus_card.dto";

@Injectable()
export class BonusCardService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBonusCardDto) {
    return this.prisma.bonusCard.create({ data: dto });
  }

  async findAll() {
    return this.prisma.bonusCard.findMany({ include: { customer: true } });
  }

  async findOne(id: number) {
    const card = await this.prisma.bonusCard.findUnique({
      where: { id },
      include: { customer: true },
    });
    if (!card) throw new NotFoundException(`BonusCard with id ${id} not found`);
    return card;
  }

  async update(id: number, dto: UpdateBonusCardDto) {
    await this.findOne(id);
    return this.prisma.bonusCard.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.bonusCard.delete({ where: { id } });
  }
}
