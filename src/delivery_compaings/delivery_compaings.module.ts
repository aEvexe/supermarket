import { Module } from '@nestjs/common';
import { DeliveryCompanyController } from './delivery_compaings.controller';
import { DeliveryCompanyService } from './delivery_compaings.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [DeliveryCompanyController],
  providers: [DeliveryCompanyService],
})
export class DeliveryCompaingsModule {}
