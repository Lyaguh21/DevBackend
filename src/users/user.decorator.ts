import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface UserPayload {
  sub: string;
  username?: string;
  role?: string;
}

export const User = createParamDecorator(
  (data: keyof UserPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: UserPayload }>();
    return data ? request.user?.[data] : request.user;
  },
);