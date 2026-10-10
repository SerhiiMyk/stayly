import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '../../../../apps/auth/src/users/models/user.schema.js';

const getCurrentUser = (ctx: ExecutionContext): UserDocument => {
  return ctx.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => getCurrentUser(ctx),
);
