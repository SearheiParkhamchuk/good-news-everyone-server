declare namespace NodeJS {
  interface ProcessEnv {
    APP_PORT: number;
    APP_ORIGINS: string;

    DB_PG_USERNAME: DB_PG_USERNAME;
    DB_PG_PASSWORD: DB_PG_PASSWORD;
    DB_PG_PORT: DB_PG_PORT;
    DB_PG_NAME: DB_PG_NAME;
    DB_PG_HOST: DB_PG_HOST;

    NEWS_EXPIRATION_CHECK_INTERVAL_MINUTES: string;
    NEWS_EXPIRATION_MINUTES: string;
    NEWS_UPDATES_CHECK_INTERVAL_MINUTES: string;

    NODE_ENV: string;
  }
}
