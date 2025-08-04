import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ManagerService {
  constructor(private prisma: PrismaService) {}

  async create(createManagerDto: CreateManagerDto) {
    const hashedPassword = await bcrypt.hash(createManagerDto.password, 10);
    return this.prisma.manager.create({
      data: {
        name: createManagerDto.name,
        phone: createManagerDto.phone,
        email: createManagerDto.email,
        hashedPassword,
      },
    });
  }

  findAll() {
    return this.prisma.manager.findMany();
  }

  async findOne(id: number) {
    const manager = await this.prisma.manager.findUnique({ where: { id } });
    if (!manager) throw new NotFoundException('Manager not found');
    return manager;
  }

  async update(id: number, updateManagerDto: UpdateManagerDto) {
    const manager = await this.prisma.manager.findUnique({ where: { id } });
    if (!manager) throw new NotFoundException('Manager not found');

    let hashedPassword = manager.hashedPassword;
    if (updateManagerDto.password) {
      hashedPassword = await bcrypt.hash(updateManagerDto.password, 10);
    }

    return this.prisma.manager.update({
      where: { id },
      data: {
        name: updateManagerDto.name,
        phone: updateManagerDto.phone,
        email: updateManagerDto.email,
        hashedPassword,
      },
    });
  }

  async remove(id: number) {
    const manager = await this.prisma.manager.findUnique({ where: { id } });
    if (!manager) throw new NotFoundException('Manager not found');
    return this.prisma.manager.delete({ where: { id } });
  }
}
