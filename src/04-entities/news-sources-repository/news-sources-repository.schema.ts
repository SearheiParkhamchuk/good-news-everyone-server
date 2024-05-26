import { ColumnDecoratorOptions } from '@/src/migrations/@helpers/map-column-decorator-to-table-column.helper';
import { NEWS_REPOSITORY_SOURCES } from './@enums';

export const NEWS_SOURCES_TABLE_NAME = 'news-sources';
export const NEWS_SOURCE_REFERENCED_COLUMN_NAME = 'news_source_id';

type Columns = 'uuid' | 'created_at' | 'updated_at' | 'title' | 'url' | 'source';

export const NEWS_SOURCES_TABLE_COLUMNS: Record<Columns, ColumnDecoratorOptions> = {
  uuid: {
    name: 'uuid',
    type: 'uuid',
    primary: true,
    unique: true,
    generated: 'uuid',
  },
  created_at: {
    name: 'created_at',
    type: 'timestamp',
    default: 'now()',
    nullable: false,
  },
  updated_at: {
    name: 'updated_at',
    type: 'timestamp',
    default: 'now()',
    nullable: false,
  },
  url: {
    name: 'url',
    type: 'varchar',
    length: '255',
    nullable: false,
    unique: true,
  },
  title: {
    name: 'title',
    type: 'varchar',
    length: '128',
    nullable: false,
  },
  source: {
    name: 'source',
    type: 'enum',
    enum: Object.values(NEWS_REPOSITORY_SOURCES),
    nullable: false,
  },
} as const;
