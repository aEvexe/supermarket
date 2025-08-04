import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CustomersModule } from './customers/customers.module';
import { AdminModule } from './admin/admin.module';
import { AdminAuthModule } from './admin_auth/auth.module';
import { AuthModule } from './auth/auth.module';
import { ManagerModule } from './manager/manager.module';
import { ManagerAuthModule } from './manage_auth/auth.module';


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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
