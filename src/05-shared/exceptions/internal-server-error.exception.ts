import { HttpStatus, InternalServerErrorException as InternalServerError } from '@nestjs/common';

export class InternalServerErrorException extends InternalServerError {
  constructor(message?: string) {
    super({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      code: 'INTERNAL_SERVER_ERROR',
      message: message ?? 'Internal server error',
    });
  }
}
