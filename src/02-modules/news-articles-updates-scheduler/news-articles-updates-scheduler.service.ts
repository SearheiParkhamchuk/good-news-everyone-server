import { NewsArticlesRemoteService } from '@/src/03-features/news-articles-remote/news-articles-remote.service';
import { ArticlesRepositoryService } from '@/src/04-entities/articles-repository';
import { ArticleSourceDTO } from '@/src/04-entities/articles-repository/@types';
import { JobScheduler } from '@/src/05-shared/modules/job-scheduler';
import { ColoredLogger } from '@/src/05-shared/modules/logger';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NewsArticlesUpdatesSchedulerService {
  private readonly logger: Logger = new ColoredLogger(NewsArticlesUpdatesSchedulerService.name);

  constructor(
    private readonly articles_repository_service: ArticlesRepositoryService,
    private readonly news_articles_remote_service: NewsArticlesRemoteService,
    job_scheduler: JobScheduler,
  ) {
    job_scheduler.createJob(
      `*/${process.env.NEWS_EXPIRATION_CHECK_INTERVAL_MINUTES} * * * *`,
      NewsArticlesUpdatesSchedulerService.name,
      this.tick.bind(this),
      { runOnInit: true },
    );
  }

  async tick() {
    try {
      const expire_at = new Date();
      expire_at.setMinutes(expire_at.getMinutes() + Number(process.env.NEWS_EXPIRATION_MINUTES));

      const { data, errors } = await this.news_articles_remote_service.fetchArticles();
      const articles: ArticleSourceDTO[] = data.map((d) => ({ ...d, expire_at }));
      this.logger.log(`CRONJOB: ${articles.length} articles received.`);

      const inserted_ids = await this.articles_repository_service.insertMany(articles);
      this.logger.log(`CRONJOB: ${inserted_ids.length} articles INSERTED.`);

      if (errors.length) this.logger.log(`ERRORS: ${errors.length}`, 'error');
    } catch (e) {
      this.logger.log('CRONJOB: Receiving news failed', 'error');
      this.logger.log(e, 'error');
    }
  }
}
