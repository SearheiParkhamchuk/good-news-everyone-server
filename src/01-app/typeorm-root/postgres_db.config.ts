import { registerAs } from '@nestjs/config';

import * as Joi from '@hapi/joi';

import { validateSchema } from '@/src/05-shared/utils/validate-schema';

export type PostgresDbConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

export const POSTGRES_CONFIG_TOKEN = 'POSTGRES_CONFIG_TOKEN';

const validationSchema = Joi.object({
  DB_PG_USERNAME: Joi.string().required(),
  DB_PG_PASSWORD: Joi.string().required(),
  DB_PG_NAME: Joi.string().required(),
  DB_PG_PORT: Joi.number().required(),
  DB_PG_HOST: Joi.string().required(),
});

export const postgres_db_config = registerAs(POSTGRES_CONFIG_TOKEN, (): PostgresDbConfig => {
  validateSchema(validationSchema, process.env);

  return {
    host: process.env.DB_PG_HOST,
    port: parseInt(process.env.DB_PG_PORT) || 5432,
    username: process.env.DB_PG_USERNAME,
    password: process.env.DB_PG_PASSWORD,
    database: process.env.DB_PG_NAME,
  };
});
