import { XmlParser } from '@/src/05-shared/modules/xml-parser';
import { NEWS_SOURCES } from './model/@enums/news-sources';
import { type NewsSource, type SourceOptions } from './model/news-source.abstract';
import { BBCNewsSourceEntity } from './source-entities/bbc/source.entity';
import { CNNNewsSourceEntity } from './source-entities/cnn/source.entity';
import { NytNewsSourceEntity } from './source-entities/nyt/source.entity';
import { TheWallStreeJournalNewsSourceEntity } from './source-entities/the-wall-stree-journal/source.entity';
import { never } from '@/src/05-shared/utils/never';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NewsSourcesEntitiesFactory {
  constructor(private readonly parser: XmlParser) {}

  create<M extends object>(source: NEWS_SOURCES, options: SourceOptions<M>): NewsSource<any, M> {
    switch (source) {
      case NEWS_SOURCES.BBC:
        return new BBCNewsSourceEntity<M>(options, this.parser);
      case NEWS_SOURCES.CNN:
        return new CNNNewsSourceEntity<M>(options, this.parser);
      case NEWS_SOURCES.NYT:
        return new NytNewsSourceEntity<M>(options, this.parser);
      case NEWS_SOURCES.WALL_STREET_JOURNAL:
        return new TheWallStreeJournalNewsSourceEntity<M>(options, this.parser);
      default:
        return never(source, `Unknown news source ${source}`);
    }
  }
}
