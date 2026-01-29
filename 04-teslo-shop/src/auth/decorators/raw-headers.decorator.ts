import { createParamDecorator } from '@nestjs/common';

export const RawHeaders = createParamDecorator((data, ctx) => {
  const request = ctx
    .switchToHttp()
    .getRequest<Express.Request & { rawHeaders: string[] }>();
  return request.rawHeaders;
});
