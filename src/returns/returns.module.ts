import { Module } from '@nestjs/common';
import { ReturnService } from './returns.service';
import { ReturnController } from './returns.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [ReturnController],
  providers: [ReturnService],
})
export class ReturnsModule {}
