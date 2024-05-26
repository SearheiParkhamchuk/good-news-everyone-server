import { partial } from 'lodash';
import { Injectable } from '@nestjs/common';
import { NewsSourcesEntitiesFactory } from './news-sources-entities.factory';
import { ArticleRemoteSource, GetSourcesCriteria } from './@types';
import { NewsSource, SourceResponse } from './model/news-source.abstract';
import { NEWS_SOURCES } from './model/@enums/news-sources';
import { NEWS_REPOSITORY_SOURCES } from '../news-sources-repository/@enums';

@Injectable()
export class NewsSourcesReceiverService {
  static selectData(data: Array<SourceResponse<ArticleRemoteSource[]>>): ArticleRemoteSource[] {
    return data
      .filter((s): s is { data: ArticleRemoteSource[]; error: null } => !!s.data)
      .map((s) => s.data)
      .flat();
  }

  constructor(private readonly sources_factory: NewsSourcesEntitiesFactory) {}

  async fetchSources({ sources }: GetSourcesCriteria): Promise<{
    data: ArticleRemoteSource[];
    errors: Array<unknown>;
  }> {
    const source_receivers = this.getSources({ sources }).flat();
    const response = await this.fetch(source_receivers);
    const articles = NewsSourcesReceiverService.selectData(response);
    const errors = response.filter((d) => !!d.error);
    return { data: articles, errors };
  }

  private getSources({ sources }: GetSourcesCriteria) {
    const bindedCreate: (source: NEWS_SOURCES, options: { url: string }) => NewsSource<any> =
      this.sources_factory.create.bind(this.sources_factory);
    const bbcSources = partial(bindedCreate, NEWS_SOURCES.BBC);
    const cnnSources = partial(bindedCreate, NEWS_SOURCES.CNN);
    const nytSources = partial(bindedCreate, NEWS_SOURCES.NYT);
    const wsjSources = partial(bindedCreate, NEWS_SOURCES.WALL_STREET_JOURNAL);
    return [
      sources.filter((s) => s.source === NEWS_REPOSITORY_SOURCES.BBC).map(bbcSources),
      sources.filter((s) => s.source === NEWS_REPOSITORY_SOURCES.CNN).map(cnnSources),
      sources.filter((s) => s.source === NEWS_REPOSITORY_SOURCES.NYT).map(nytSources),
      sources.filter((s) => s.source === NEWS_REPOSITORY_SOURCES.WALL_STREET_JOURNAL).map(wsjSources),
    ];
  }

  private async fetch(sources: NewsSource[]): Promise<Array<SourceResponse<ArticleRemoteSource[]>>> {
    const response = await Promise.all(sources.map(async (s) => s.getAll()));
    return response.map((s) => s.adapter());
  }
}
