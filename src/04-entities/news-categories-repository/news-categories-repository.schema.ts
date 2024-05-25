import { ColumnDecoratorOptions } from '@/src/migrations/@helpers/map-column-decorator-to-table-column.helper';
import { NEWS_CATEGORIES_TYPES } from './@enum';

export const NEWS_CATEGORIES_TABLE_NAME = 'news-categories';
export const NEWS_CATEGORIES_REFERENCED_COLUMN_NAME = 'category_id';

type Columns = 'uuid' | 'name' | 'key' | 'type';

export const NEWS_CATEGORIES_TABLE_COLUMNS: Record<Columns, ColumnDecoratorOptions> = {
  uuid: {
    name: 'uuid',
    type: 'uuid',
    primary: true,
    unique: true,
    generated: 'uuid',
  },
  name: {
    name: 'name',
    type: 'varchar',
    length: '64',
    nullable: false,
  },
  key: {
    name: 'key',
    type: 'varchar',
    length: '64',
    nullable: false,
  },
  type: {
    name: 'type',
    type: 'enum',
    enum: Object.values(NEWS_CATEGORIES_TYPES),
    nullable: false,
  },
} as const;
