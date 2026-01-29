import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      'roles',
      context.getHandler(),
    );
    const request: Express.Request = context.switchToHttp().getRequest();
    const user = request.user as User | undefined;

    if (!user) throw new InternalServerErrorException('User not found (guard)');

    if (!user.roles.some((role) => validRoles.includes(role)))
      throw new ForbiddenException(`User ${user.fullName} needs a valid role`);

    return true;
  }
}
