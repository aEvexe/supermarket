import { PartialType } from '@nestjs/swagger';
import { CreateBonusCardDto } from './create-bonus_card.dto';

export class UpdateBonusCardDto extends PartialType(CreateBonusCardDto) {}
