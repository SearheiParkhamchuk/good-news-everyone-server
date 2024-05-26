import { ArticlesRepositoryService } from '@/src/04-entities/articles-repository';
import { JobScheduler } from '@/src/05-shared/modules/job-scheduler';
import { ColoredLogger } from '@/src/05-shared/modules/logger';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NewsArticlesDeletionSchedulerService {
  private readonly logger: Logger = new ColoredLogger(NewsArticlesDeletionSchedulerService.name);

  constructor(
    private readonly articles_repository_service: ArticlesRepositoryService,
    job_scheduler: JobScheduler,
  ) {
    job_scheduler.createJob(
      `*/${process.env.NEWS_EXPIRATION_CHECK_INTERVAL_MINUTES} * * * *`,
      NewsArticlesDeletionSchedulerService.name,
      this.tick.bind(this),
      { runOnInit: true },
    );
  }

  async tick() {
    try {
      const deleted = await this.articles_repository_service.deleteExpired();
      this.logger.log(`CRONJOB: ${deleted.length} articles DELETED.`);
    } catch (e) {
      this.logger.log('CRONJOB: Deletion failed', 'error');
      this.logger.log(e, 'error');
    }
  }
}
