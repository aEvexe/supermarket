import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CustomerController } from './customers.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [CustomerController],
  providers: [CustomersService],
  exports: [CustomersService]
})
export class CustomersModule {}
