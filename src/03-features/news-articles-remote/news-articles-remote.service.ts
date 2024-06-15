import { NewsSourcesReceiverService } from '@/src/04-entities/news-sources-receiver';
import { NewsSourcesRepositoryService } from '@/src/04-entities/news-sources-repository';
import { Injectable } from '@nestjs/common';
import { Metadata } from './@types';
import { ArticleRemoteSource } from '@/src/04-entities/news-sources-receiver/@types';

@Injectable()
export class NewsArticlesRemoteService {
  constructor(
    private readonly news_receiver: NewsSourcesReceiverService,
    private readonly news_sources_repository: NewsSourcesRepositoryService,
  ) {}

  async fetchArticles(): Promise<{
    data: Array<ArticleRemoteSource & { source: Metadata }>;
    errors: unknown[];
  }> {
    const raw_sources = await this.news_sources_repository.getAll();
    const sources = raw_sources.map((s) => ({ url: s.url, source: s.source, metadata: s }));
    const raw_response = await this.news_receiver.fetchSources<Metadata>({ sources });

    const errors = NewsSourcesReceiverService.selectErrors(raw_response);
    const data = NewsSourcesReceiverService.selectData<Metadata>(raw_response);

    const response_with_metadata = data.map((r) => r.data.map((d) => ({ ...d, source: r.metadata }))).flat();
    return { data: response_with_metadata, errors };
  }
}
