import { PolymorphicSearcParams } from '../types/PolymorphicSearcParams';

export function pickArraySearchParameter(params: PolymorphicSearcParams, key: string): string[] {
  if (params instanceof URLSearchParams) return params.getAll(key);
  const parameter = params[key];
  if (!parameter) return [];
  return Array.isArray(parameter) ? parameter : [parameter];
}
