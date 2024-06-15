import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { DatabaseExceptionFilter } from './database-exception.filter';
import { UnhandledExceptionFilter } from './unhandled-exception.filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: DatabaseExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: UnhandledExceptionFilter,
    },
  ],
})
export class GlobalFilters {}
