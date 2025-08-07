import { PartialType } from '@nestjs/swagger';
import { CreateDeliveryItemDto } from './create-delivery_itme.dto';

export class UpdateDeliveryItmeDto extends PartialType(CreateDeliveryItemDto) {}
