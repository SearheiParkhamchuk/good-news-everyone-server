import { BadRequestException, HttpStatus } from '@nestjs/common';

export type InvalidField = {
  id: string;
  message: string;
};

export type InvalidFields = Array<InvalidField>;

export type ValidationErrorResponse = {
  status: HttpStatus.BAD_REQUEST;
  error_code: 'VALIDATION';
  user_message: string;
  more_info: {
    invalid_fields: InvalidFields;
  };
};

export function ValidationError(userMessage: string, invalidFields: InvalidFields): BadRequestException {
  const errorResponse: ValidationErrorResponse = {
    status: HttpStatus.BAD_REQUEST,
    error_code: 'VALIDATION',
    user_message: userMessage,
    more_info: {
      invalid_fields: invalidFields,
    },
  };

  return new BadRequestException(errorResponse);
}
