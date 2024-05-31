import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ColoredLogger } from './05-shared/modules/logger';

async function bootstrap() {
  const logger = new ColoredLogger();
  const app = await NestFactory.create(AppModule, {
    cors: { origin: process.env.APP_ORIGINS.split(',') },
    forceCloseConnections: true,
  });
  await app.listen(process.env.APP_PORT, () => {
    logger.log(`App is running on port: ${process.env.APP_PORT}`);
  });
}
bootstrap();
