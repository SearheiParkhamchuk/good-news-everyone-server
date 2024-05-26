import { Module } from '@nestjs/common';
import { NewsArticlesDeletionSchedulerService } from './news-articles-deletion-scheduler.service';
import { ArticlesRepositoryModule } from '@/src/04-entities/articles-repository';
import { JobScheduler } from '@/src/05-shared/modules/job-scheduler';

@Module({
  controllers: [],
  imports: [ArticlesRepositoryModule],
  providers: [NewsArticlesDeletionSchedulerService, JobScheduler],
})
export class NewsArticlesDeletionSchedulerModule {}
