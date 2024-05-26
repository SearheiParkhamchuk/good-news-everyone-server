import { NewsSourcesReceiverService } from '@/src/04-entities/news-sources-receiver';
import { NewsSourcesRepositoryService } from '@/src/04-entities/news-sources-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NewsArticlesRemoteService {
  constructor(
    private readonly news_receiver: NewsSourcesReceiverService,
    private readonly news_sources_repository: NewsSourcesRepositoryService,
  ) {}

  async fetchArticles() {
    const sources = await this.news_sources_repository.getAll();
    return await this.news_receiver.fetchSources({ sources });
  }
}
