import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUIRED_PERMISSION } from './autho.decorator';
import { AuthoService } from './autho.service';

@Injectable()
export class AuthoGuard implements CanActivate {
  constructor(
    private readonly authoService: AuthoService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user } = context.switchToHttp().getRequest();
    const permissions = await this.authoService.getUserPermissions(user.userId);
    const requiredPermission = this.reflector.get(
      REQUIRED_PERMISSION,
      context.getHandler(),
    );
    if (permissions.indexOf(requiredPermission) == -1) {
      return false;
    }
    return true;
  }
}
