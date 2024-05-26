import { Module } from '@nestjs/common';
import { NewsArticlesUpdatesSchedulerService } from './news-articles-updates-scheduler.service';
import { ArticlesRepositoryModule } from '@/src/04-entities/articles-repository';
import { NewsArticlesRemoteModule } from '@/src/03-features/news-articles-remote';
import { JobScheduler } from '@/src/05-shared/modules/job-scheduler';

@Module({
  controllers: [],
  imports: [ArticlesRepositoryModule, NewsArticlesRemoteModule],
  providers: [NewsArticlesUpdatesSchedulerService, JobScheduler],
})
export class NewsArticlesUpdatesSchedulerModule {}
