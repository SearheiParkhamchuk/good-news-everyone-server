import { type RawDataSource } from './@types';
import { type ArticleRemoteSource } from '../../@types';
import { NewsSource, type SourceOptions, type SourceResponse } from '../../model/news-source.abstract';
import { XmlParser } from '@/src/05-shared/modules/xml-parser';
import { NEWS_SOURCES } from '../../model/@enums/news-sources';

const DEFAULT_POSTER = 'https://s.wsj.net/img/meta/wsj-social-share.png';

export class TheWallStreeJournalNewsSourceEntity<M extends object> extends NewsSource<RawDataSource, M> {
  readonly source = NEWS_SOURCES.NYT;
  constructor(
    readonly options: SourceOptions<M>,
    readonly parser: XmlParser,
  ) {
    super(options, parser);
  }

  adapter(): SourceResponse<ArticleRemoteSource[], M> {
    const rawData = this.data;
    const metadata = rawData.metadata;
    if (!rawData.data) {
      return { error: this.error ?? new Error('Internal server error'), data: null, metadata };
    }

    const source_name = rawData.data.rss.channel.title;

    const data = rawData.data.rss.channel.item.map((item) => ({
      description: item.description,
      id: item.guid['#text'],
      published_at: new Date(item.pubDate),
      source_url: item.link,
      source_name,
      thumbnail: DEFAULT_POSTER,
      title: item.title,
      media: { images: [] },
    }));

    return { error: null, data, metadata };
  }
}
