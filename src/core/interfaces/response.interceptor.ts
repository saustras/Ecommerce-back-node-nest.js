import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { firstValueFrom, of } from 'rxjs';

const statusMessages = {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'NonAuthoritativeInfo',
  204: 'NoContent',
  205: 'ResetContent',
  206: 'PartialContent',
};

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  public constructor(private readonly reflector: Reflector) {}

  public async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<any> {
    const body = await firstValueFrom(next.handle());
    return of({
      statusCode: body.statusCode,
      message: Array.isArray(body.message) ? body.message : [body.message],
      data: body.data,
      count: body.count
    });
    
  }
}
