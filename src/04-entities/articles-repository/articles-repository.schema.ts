import { ColumnDecoratorOptions } from '@/src/migrations/@helpers/map-column-decorator-to-table-column.helper';

export const ARTICLES_TABLE_NAME = 'articles';
export const ARTICLES_TABLE_SOURCE_FOREIGN_KEY = 'article_source_foreign_key';

type Columns =
  | 'uuid'
  | 'published_at'
  | 'created_at'
  | 'expire_at'
  | 'updated_at'
  | 'id'
  | 'description'
  | 'thumbnail'
  | 'title'
  | 'source_url'
  | 'source_name'
  | 'media'
  | 'source';

export const ARTICLES_TABLE_COLUMNS: Record<Columns, ColumnDecoratorOptions> = {
  uuid: {
    name: 'uuid',
    type: 'uuid',
    primary: true,
    unique: true,
    generated: 'uuid',
  },
  published_at: {
    name: 'published_at',
    type: 'timestamp',
    nullable: false,
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
  expire_at: {
    name: 'expire_at',
    type: 'timestamp',
    nullable: false,
  },
  id: {
    name: 'id',
    type: 'varchar',
    nullable: true,
    length: '512',
  },
  description: {
    name: 'description',
    type: 'text',
    nullable: true,
  },
  thumbnail: {
    name: 'thumbnail',
    type: 'text',
    nullable: true,
  },
  title: {
    name: 'title',
    type: 'text',
    nullable: false,
  },
  source_url: {
    name: 'source_url',
    type: 'text',
    nullable: false,
    unique: true,
  },
  source_name: {
    name: 'source_name',
    type: 'varchar',
    length: '128',
    nullable: false,
  },
  media: {
    name: 'media',
    type: 'json',
    nullable: false,
  },
  source: {
    name: 'source',
    type: 'uuid',
    nullable: false,
    unique: false,
  },
} as const;
