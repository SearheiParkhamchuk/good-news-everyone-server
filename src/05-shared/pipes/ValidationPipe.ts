import { ValidationPipe as NestjsValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { ValidationError as ValidatorErrors } from 'class-validator';
import { ValidationError } from '../exceptions/validation-error.exception';

export class ValidationPipe extends NestjsValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const flatten = errors.map((e) => this.flattenValidationError(e));
        const merged_flatten = this.mergeFlattenValidationErrors(flatten);
        return new ValidationError('Validation error', merged_flatten);
      },
      ...options,
    });
  }

  protected mergeFlattenValidationErrors<V>(flattenErrors: Array<Record<string, V>>): Record<string, V> {
    return flattenErrors.reduce<Record<string, V>>((acc, errors) => ({ ...acc, ...errors }), {});
  }

  protected flattenValidationError(error: ValidatorErrors, path?: string) {
    let validationErrors: Record<string, string[]> = {};
    const parentPath = path ? `${path}.${error.property}` : error.property;

    if (error.constraints) {
      validationErrors = { ...validationErrors, [error.property]: Object.values(error.constraints) };
    }

    if (!error.children?.length) {
      return validationErrors;
    }

    for (const item of error.children) {
      if (item.children?.length) {
        validationErrors = { ...validationErrors, ...this.flattenValidationError(item, parentPath) };
      }

      if (item.constraints) {
        validationErrors = {
          ...validationErrors,
          [`${parentPath}.${item.property}`]: Object.values(item.constraints),
        };
      }
    }
    return validationErrors;
  }
}
