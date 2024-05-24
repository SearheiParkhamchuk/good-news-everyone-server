export function never(unexpectedValue: never, message?: string): never {
  throw new TypeError(message ?? `Unexpected value: ${unexpectedValue}`);
}
