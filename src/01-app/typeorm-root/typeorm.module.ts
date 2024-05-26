import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { POSTGRES_CONFIG_TOKEN, postgres_db_config, PostgresDbConfig } from './postgres_db.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const postgresConfig = config.getOrThrow<PostgresDbConfig>(POSTGRES_CONFIG_TOKEN);
        return {
          type: 'postgres',
          host: postgresConfig.host,
          port: postgresConfig.port,
          username: postgresConfig.username,
          password: postgresConfig.password,
          database: postgresConfig.database,
          autoLoadEntities: true,
          synchronize: process.env.NODE_ENV !== 'production',
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule.forFeature(postgres_db_config)],
    }),
  ],
})
export class TypeormRootModule {}
