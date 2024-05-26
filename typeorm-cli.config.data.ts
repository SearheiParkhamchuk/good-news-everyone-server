import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core/nest-factory';

import { DataSource } from 'typeorm';
import { PostgresDbConfig, postgres_db_config } from './src/01-app/typeorm-root/postgres_db.config';
import { ArticleRepositoryEntity } from './src/04-entities/articles-repository/articles-repository.entity';
import { InsertInitialCategories1716583258194 } from './src/migrations/news-categories/1716583258194-insert-initial-categories';
import { NewsCategoriesRepositoryEntity } from './src/04-entities/news-categories-repository/news-categories-repository.entity';
import { NewsSourcesRepositoryEntity } from './src/04-entities/news-sources-repository/news-sources-repository.entity';
import { InsertInitialNewsSources1716647408625 } from './src/migrations/news-sources/1716647408625-insert-initial-news-sources';

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
      entities: [ArticleRepositoryEntity, NewsCategoriesRepositoryEntity, NewsSourcesRepositoryEntity],
      migrations: [InsertInitialCategories1716583258194, InsertInitialNewsSources1716647408625],
      migrationsTableName: 'migrations-data',
      synchronize: false,
    });
  },
);

export default dataSource;
