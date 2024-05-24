import { ObjectSchema } from '@hapi/joi';

export function validateSchema<T, V extends object>(schema: ObjectSchema<T>, value: V): void {
  const result = schema.validate(value, { stripUnknown: true });

  if (result.error) {
    throw new Error(`Config validation error: ${result.error.message}`);
  }
}
