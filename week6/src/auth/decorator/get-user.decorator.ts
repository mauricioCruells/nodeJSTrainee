import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export type Payload = {
  sub: number;
  email: string;
  role: string;
  username: string;
  iat: number;
  exp: number;
};

export const GetUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const request: Express.Request = context
      .switchToHttp()
      .getRequest();
    return request.user;
  },
);
