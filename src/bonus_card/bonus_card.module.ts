import { Module } from '@nestjs/common';
import { BonusCardService } from './bonus_card.service';
import { BonusCardController } from './bonus_card.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BonusCardController],
  providers: [BonusCardService],
})
export class BonusCardModule {}
