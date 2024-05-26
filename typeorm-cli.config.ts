import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core/nest-factory';

import { DataSource } from 'typeorm';
import { PostgresDbConfig, postgres_db_config } from './src/01-app/typeorm-root/postgres_db.config';
import { ArticleRepositoryEntity } from './src/04-entities/articles-repository/articles-repository.entity';
import { CreateArticlesTable1716558248888 } from './src/migrations/articles/1716558248888-create-articles-table';
import { CreateTypeKeyIndex1716563826609 } from './src/migrations/news-categories/1716563826609-create-type-key-index';
import { CreateNewsCategoriesTable1716563709169 } from './src/migrations/news-categories/1716563709169-create-news-categories-table';
import { NewsCategoriesRepositoryEntity } from './src/04-entities/news-categories-repository/news-categories-repository.entity';
import { NewsSourcesRepositoryEntity } from './src/04-entities/news-sources-repository/news-sources-repository.entity';
import { CreateNewsSourcesTable1716638750328 } from './src/migrations/news-sources/1716638750328-create-news-sources-table';
import { CreateArticlesSourceForeignKey1716749159193 } from './src/migrations/articles/1716749159193-create-articles-source-foreign-key';

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
      migrationsTableName: 'migrations',
      synchronize: false,
      migrations: [
        CreateArticlesTable1716558248888,
        CreateNewsCategoriesTable1716563709169,
        CreateTypeKeyIndex1716563826609,
        CreateNewsSourcesTable1716638750328,
        CreateArticlesSourceForeignKey1716749159193,
      ],
    });
  },
);

export default dataSource;
