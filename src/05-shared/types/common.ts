import { Type } from '@nestjs/common';

export type ID = string;

export type Constructor<T> = Type<T>;
