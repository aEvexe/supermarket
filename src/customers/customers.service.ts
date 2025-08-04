import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateCustomerDto) {
    return this.prisma.customer.create({ data });
  }

  findAll() {
    return this.prisma.customer.findMany();
  }

  findOne(id: number) {
    return this.prisma.customer.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateCustomerDto) {
    return this.prisma.customer.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.customer.delete({ where: { id } });
  }

  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found');
    }

    const user = await this.prisma.customer.findUnique({
      where: { activation_link: link },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.is_active) {
      throw new BadRequestException('User already activated');
    }

    user.is_active = true;

    return {
      message: 'User activated successfully',
      is_active: user.is_active,
    };
  }
}
