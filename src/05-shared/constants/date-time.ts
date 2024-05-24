import { InMilliseconds, InSeconds } from '../types/date-time';

export const HOUR_SECONDS: InSeconds = 60 * 60;
export const DAY_SECONDS: InSeconds = 60 * 60 * 24;

export const HOUR_MS: InMilliseconds = HOUR_SECONDS * 1000;
export const HALF_DAY_MS: InMilliseconds = 12 * HOUR_MS;
export const DAY_MS: InMilliseconds = 24 * HOUR_MS;
export const ONE_DAY_SECONDS: InSeconds = 24 * 60 * 60;
