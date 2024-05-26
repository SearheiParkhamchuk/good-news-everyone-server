export function never(unexpectedValue: never | null, message?: string): never {
  throw new TypeError(message ?? `Unexpected value: ${unexpectedValue}`);
}
