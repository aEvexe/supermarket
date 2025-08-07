import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CustomersModule } from './customers/customers.module';
import { AdminModule } from './admin/admin.module';
import { AdminAuthModule } from './admin_auth/auth.module';
import { AuthModule } from './auth/auth.module';
import { ManagerModule } from './manager/manager.module';
import { ManagerAuthModule } from './manage_auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { DiscountModule } from './discount/discount.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { DeliveryCompaingsModule } from './delivery_compaings/delivery_compaings.module';
import { DeliveryModule } from './delivery/delivery.module';
import { DeliveryItmesModule } from './delivery_itmes/delivery_itmes.module';
import { ReturnsModule } from './returns/returns.module';
import { OrderItemsModule } from './order_items/order_items.module';
import { BonusCardModule } from './bonus_card/bonus_card.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { StockMovementModule } from './stock_movement/stock_movement.module';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    PrismaModule,
    CustomersModule,
    AdminModule,
    AdminAuthModule,
    AuthModule,
    ManagerModule,
    ManagerAuthModule,
    CategoryModule,
    ProductModule,
    DiscountModule,
    OrderModule,
    PaymentModule,
    DeliveryCompaingsModule,
    DeliveryModule,
    DeliveryItmesModule,
    ReturnsModule,
    OrderItemsModule,
    BonusCardModule,
    WarehouseModule,
    StockMovementModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
