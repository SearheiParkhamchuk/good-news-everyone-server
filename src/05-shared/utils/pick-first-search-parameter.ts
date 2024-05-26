import { PolymorphicSearcParams } from '../types/PolymorphicSearcParams';

export function pickFirstSearchParameter(params: PolymorphicSearcParams, key: string): string | undefined {
  if (params instanceof URLSearchParams) return params.get(key) ?? undefined;
  const parameter = params[key];
  return Array.isArray(parameter) ? parameter[0] : parameter;
}
