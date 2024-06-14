import { PolymorphicSearcParams } from '../types/PolymorphicSearcParams';

type Enum = Record<string, string | number>;

export function pickEnumSearchParameter<V extends Enum>(
  parameters: PolymorphicSearcParams,
  num: V,
  key: string,
): V[keyof V] | undefined {
  let parameter: string | string[] | undefined;

  if (parameters instanceof URLSearchParams) parameter = parameters.get(key) ?? undefined;
  else parameter = parameters[key];

  const value = Array.isArray(parameter) ? parameter[0] : parameter;
  if (!value) return undefined;
  if (Object.values(num).includes(value)) return value as V[keyof V];

  return undefined;
}
