import { BadRequestException } from '@/src/05-shared/exceptions/bad-request.exception';
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class DatabaseExceptionFilter<T extends TypeORMError> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const reply = context.getResponse<Response>();
    const message = process.env.NODE_ENV === 'development' ? exception.message : 'Invalid operation';

    return reply.status(HttpStatus.BAD_REQUEST).json(new BadRequestException(message).getResponse());
  }
}
