import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface UserPayload {
  sub: string;
  username?: string;
  role?: string;
}
export const User = createParamDecorator((data, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  console.log('Request user:', request.user);
  return data ? request.user?.[data] : request.user;
});
