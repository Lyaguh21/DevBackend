import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface UserPayload {
  sub: string;
  username?: string;
  role?: string;
}
export const User = createParamDecorator((data, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  return data ? request.user?.[data] : request.user;
});
