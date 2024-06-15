import { InternalServerErrorException } from '@/src/05-shared/exceptions/internal-server-error.exception';
import { ValidationError } from '@/src/05-shared/exceptions/validation-error.exception';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const reply = context.getResponse<Response>();
    const status = exception.getStatus();

    if (exception instanceof ValidationError) {
      const exception_plain = exception.getResponse();
      return reply.status(status).json(exception_plain);
    }

    return reply
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(new InternalServerErrorException().getResponse());
  }
}
