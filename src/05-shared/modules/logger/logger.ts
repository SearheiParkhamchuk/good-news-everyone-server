import { Logger } from '@nestjs/common';
import { coloredLogMessage } from '../../utils/colored-log-message';

export class ColoredLogger extends Logger {
  log(message: string, type?: 'error' | 'success') {
    super.log(coloredLogMessage(message, type));
  }
}
