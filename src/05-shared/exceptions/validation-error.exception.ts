import { BadRequestException, HttpStatus } from '@nestjs/common';

type InvalidFields = {
  [property: string]: string[];
};

export class ValidationError extends BadRequestException {
  constructor(message: string, invalid_fields: InvalidFields) {
    super({
      status: HttpStatus.BAD_REQUEST,
      code: 'VALIDATION',
      message,
      more_info: { invalid_fields },
    });
  }
}
