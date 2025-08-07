import { PartialType } from '@nestjs/swagger';
import { CreateDeliveryCompanyDto } from "./create-delivery_compaing.dto";

export class UpdateDeliveryCompaingDto extends PartialType(CreateDeliveryCompanyDto) {}
