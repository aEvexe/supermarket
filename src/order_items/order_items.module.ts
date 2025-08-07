import { Module } from '@nestjs/common';
import { OrderItemsService } from './order_items.service';
import { OrderItemController } from './order_items.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [OrderItemController],
  providers: [OrderItemsService],
})
export class OrderItemsModule {}
