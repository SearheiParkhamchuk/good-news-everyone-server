import { type RawDataSource } from './@types';
import { type ArticleRemoteSource } from '../../@types';
import { NEWS_SOURCES } from '../../model/@enums/news-sources';
import { NewsSource, type SourceOptions, type SourceResponse } from '../../model/news-source.abstract';
import { XmlParser } from '@/src/05-shared/modules/xml-parser';

export class BBCNewsSourceEntity extends NewsSource<RawDataSource> {
  readonly source = NEWS_SOURCES.BBC;
  constructor(
    readonly options: SourceOptions,
    readonly parser: XmlParser,
  ) {
    super(options, parser);
  }

  adapter(): SourceResponse<ArticleRemoteSource[]> {
    const rawData = this.data;
    if (!rawData) return { error: this.error ?? new Error('Internal server error'), data: null };

    const data = rawData.rss.channel.item.map((item) => {
      const thumbnail = item['media:thumbnail'];
      return {
        description: item.description,
        id: item.guid['#text'],
        published_at: new Date(item.pubDate),
        source_url: item.link,
        source_name: rawData.rss.channel.title,
        thumbnail: thumbnail?.['@_url'] ?? undefined,
        title: item.title,
        media: {
          images: thumbnail
            ? [
                {
                  width: thumbnail['@_width'].toString(),
                  height: thumbnail['@_height'].toString(),
                  url: thumbnail['@_url'],
                },
              ]
            : [],
        },
      };
    });

    return { error: null, data };
  }
}
