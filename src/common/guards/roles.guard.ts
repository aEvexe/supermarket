import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>("roles", context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException("Unauthorized");
    }

    // If no roles specified, allow
    if (!roles) return true;

    // If user has one of the allowed roles, allow
    if (roles.includes(user.role)) return true;

    // Ownership check (only if route has `:id`)
    const resourceId = parseInt(request.params.id, 10);
    if (resourceId && user.id === resourceId) {
      return true;
    }

    throw new ForbiddenException("You do not have access to this resource");
  }
}
