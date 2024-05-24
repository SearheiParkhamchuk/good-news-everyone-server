import { ConfigType, registerAs } from '@nestjs/config';

import * as Joi from '@hapi/joi';

import { validateSchema } from '../utils/validate-schema';

export const APP_CONFIG_TOKEN = 'APP_CONFIG_TOKEN';

const validationSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
});

export const appConfig = registerAs(APP_CONFIG_TOKEN, () => {
  validateSchema(validationSchema, process.env);

  return {
    environment: process.env.NODE_ENV,
  };
});

export type AppConfig = ConfigType<typeof appConfig>;
