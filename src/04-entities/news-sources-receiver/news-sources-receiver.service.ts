import { partial } from 'lodash';
import { Injectable } from '@nestjs/common';
import { NewsSourcesEntitiesFactory } from './news-sources-entities.factory';
import { ArticleRemoteSource, GetSourcesCriteria } from './@types';
import { NewsSource, SourceResponse } from './model/news-source.abstract';
import { NEWS_SOURCES } from './model/@enums/news-sources';
import { NEWS_REPOSITORY_SOURCES } from '../news-sources-repository/@enums';

@Injectable()
export class NewsSourcesReceiverService {
  static selectErrors(sources: SourceResponse<ArticleRemoteSource[], any>[]) {
    return sources.reduce<Error[]>((acc, source) => {
      if (source.error) acc.push(source.error);
      return acc;
    }, []);
  }

  static selectData<M extends object>(sources: SourceResponse<ArticleRemoteSource[], M>[]) {
    return sources.reduce<Array<{ data: ArticleRemoteSource[]; metadata: M }>>((acc, { data, metadata }) => {
      if (data) acc.push({ data, metadata });
      return acc;
    }, []);
  }

  constructor(private readonly sources_factory: NewsSourcesEntitiesFactory) {}

  async fetchSources<M extends object>({ sources }: GetSourcesCriteria<M>) {
    const source_receivers = this.getSources<M>({ sources });
    const response = await this.fetch<M>(source_receivers);
    return response;
  }

  private getSources<M extends object>({ sources }: GetSourcesCriteria<M>) {
    const bindedCreate: (source: NEWS_SOURCES, options: { url: string }) => NewsSource<any, M> =
      this.sources_factory.create.bind(this.sources_factory);

    const sources_map = {
      [NEWS_REPOSITORY_SOURCES.BBC]: partial(bindedCreate, NEWS_SOURCES.BBC),
      [NEWS_REPOSITORY_SOURCES.CNN]: partial(bindedCreate, NEWS_SOURCES.CNN),
      [NEWS_REPOSITORY_SOURCES.NYT]: partial(bindedCreate, NEWS_SOURCES.NYT),
      [NEWS_REPOSITORY_SOURCES.WALL_STREET_JOURNAL]: partial(bindedCreate, NEWS_SOURCES.WALL_STREET_JOURNAL),
    };

    return sources.reduce<NewsSource<any, M>[]>((acc, source) => {
      const receiver = sources_map[source.source];
      if (!receiver) throw new Error(`Invalid news source: ${source.source}`);
      acc.push(receiver(source));
      return acc;
    }, []);
  }

  private async fetch<M extends object>(
    sources: NewsSource<any, M>[],
  ): Promise<Array<SourceResponse<ArticleRemoteSource[], M>>> {
    const response = await Promise.all(sources.map(async (s) => s.getAll()));
    return response.map((s) => s.adapter());
  }
}
