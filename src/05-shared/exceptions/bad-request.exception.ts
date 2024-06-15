import { BadRequestException as BadRequest, HttpStatus } from '@nestjs/common';

export class BadRequestException extends BadRequest {
  constructor(message?: string) {
    super({
      status: HttpStatus.BAD_REQUEST,
      code: 'BAD_REQUEST',
      message: message ?? 'Bad request',
    });
  }
}
