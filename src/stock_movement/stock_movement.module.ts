import { Module } from '@nestjs/common';
import { StockMovementService } from './stock_movement.service';
import { StockMovementController } from './stock_movement.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [StockMovementController],
  providers: [StockMovementService],
})
export class StockMovementModule {}
