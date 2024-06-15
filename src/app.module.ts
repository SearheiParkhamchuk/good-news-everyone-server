import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';

import { TypeormRootModule } from './01-app/typeorm-root/typeorm.module';
import { NewsArticlesUpdatesSchedulerModule } from './02-modules/news-articles-updates-scheduler';
import { NewsArticlesDeletionSchedulerModule } from './02-modules/news-articles-deletion-scheduler';
import { NewsArticlesModule } from './02-modules/news-articles/news-articles.module';
import { NewsCategoriesRepositoryModule } from './04-entities/news-categories-repository';
import { appConfig } from './05-shared/configs/app.config';
import { GlobalInterceptors } from './01-app/global-interceptors/global-interceptors.module';
import { NewsCategoriesModule } from './02-modules/news-categories';
import { GlobalFilters } from './01-app/global-filters/global-filters.module';

@Module({
  imports: [
    NewsCategoriesRepositoryModule,
    NewsArticlesUpdatesSchedulerModule,
    NewsArticlesDeletionSchedulerModule,
    TypeormRootModule,
    NewsArticlesModule,
    NewsCategoriesModule,
    GlobalInterceptors,
    GlobalFilters,
    ConfigModule.forRoot({ load: [appConfig] }),
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
