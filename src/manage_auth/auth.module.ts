import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "../prisma/prisma.module";
import { MailModule } from "../mail/mail.module";
import { ManagerModule } from "../manager/manager.module";
import { ManagerAuthService } from "./auth.service";

@Module({
  imports: [JwtModule.register({}), PrismaModule, ManagerModule, MailModule],
  controllers: [AuthController],
  providers: [ManagerAuthService],
})
export class ManagerAuthModule {}
