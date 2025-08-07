import { Module } from '@nestjs/common';
import { DeliveryItemService } from './delivery_itmes.service';
import { DeliveryItemController } from './delivery_itmes.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [DeliveryItemController],
  providers: [DeliveryItemService],
})
export class DeliveryItmesModule {}
