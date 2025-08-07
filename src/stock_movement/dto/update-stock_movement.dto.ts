import { PartialType } from '@nestjs/swagger';
import { CreateStockMovementDto } from './create-stock_movement.dto';

export class UpdateStockMovementDto extends PartialType(CreateStockMovementDto) {}
