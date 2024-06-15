import { InternalServerErrorException } from '@/src/05-shared/exceptions/internal-server-error.exception';
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class UnhandledExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const reply = context.getResponse<Response>();

    const message =
      process.env.NODE_ENV === 'development' && exception instanceof Error
        ? exception.message
        : 'Internal server error';

    return reply
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(new InternalServerErrorException(message).getResponse());
  }
}
