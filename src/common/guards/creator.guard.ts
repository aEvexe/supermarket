import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class CreatorGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // This comes from your JWT strategy

    if (!user) {
      throw new ForbiddenException("Unauthorized");
    }

    if (!user.is_creator) {
      throw new ForbiddenException("Only creators can perform this action");
    }

    return true;
  }
}
