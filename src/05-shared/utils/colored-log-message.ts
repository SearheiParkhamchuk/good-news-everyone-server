import { never } from './never';

export function coloredLogMessage(message: unknown, type: 'error' | 'success' = 'success'): string {
  switch (type) {
    case 'success':
      return `\x1b[36m${message}\x1b[0m`;
    case 'error':
      return `\x1b[31m${message}\x1b[0m`;
    default:
      never(null, `Invalid log type ${type}`);
  }
}
