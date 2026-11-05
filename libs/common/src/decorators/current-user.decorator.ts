import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../models/user.entity.js';

const getCurrentUser = (ctx: ExecutionContext): User => {
  return ctx.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => getCurrentUser(ctx),
);
