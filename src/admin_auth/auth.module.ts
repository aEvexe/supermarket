import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminAuthService } from './auth.service';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [JwtModule.register({}), PrismaModule, AdminModule, MailModule],
  controllers: [AuthController],
  providers: [AdminAuthService],
})
export class AdminAuthModule {}
