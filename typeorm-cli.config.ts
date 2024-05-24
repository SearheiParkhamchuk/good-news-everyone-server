import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core/nest-factory';

import { DataSource } from 'typeorm';
import { PostgresDbConfig, postgres_db_config } from './src/01-app/typeorm-root/postgres_db.config';
import { ArticleEntity } from './src/04-entities/articles/articles.entity';
import { CreateArticlesTable1716558248888 } from './src/migrations/articles/1716558248888-create-articles-table';

const dataSource = NestFactory.create(ConfigModule.forRoot({ load: [postgres_db_config] })).then(
  (app: INestApplication) => {
    const config: PostgresDbConfig = app.get(postgres_db_config.KEY);
    return new DataSource({
      type: 'postgres',
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      entities: [ArticleEntity],
      migrations: [CreateArticlesTable1716558248888],
    });
  },
);

export default dataSource;
