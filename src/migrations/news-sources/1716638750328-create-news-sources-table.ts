import {
  NEWS_SOURCES_TABLE_COLUMNS,
  NEWS_SOURCES_TABLE_NAME,
  NEWS_SOURCE_CATEGORIES_TABLE_NAME,
  NEWS_SOURCE_REFERENCED_COLUMN_NAME,
} from '@/src/04-entities/news-sources-repository/news-sources-repository.schema';
import { MigrationInterface, QueryRunner, TableColumn, Table, TableIndex, TableForeignKey } from 'typeorm';
import { mapColumnDecoratorToTableColumn } from '../@helpers/map-column-decorator-to-table-column.helper';
import {
  NEWS_CATEGORIES_REFERENCED_COLUMN_NAME,
  NEWS_CATEGORIES_TABLE_COLUMNS,
  NEWS_CATEGORIES_TABLE_NAME,
} from '@/src/04-entities/news-categories-repository/news-categories-repository.schema';

const UUID = new TableColumn(mapColumnDecoratorToTableColumn(NEWS_SOURCES_TABLE_COLUMNS.uuid));
const CREATED_AT = new TableColumn(mapColumnDecoratorToTableColumn(NEWS_SOURCES_TABLE_COLUMNS.created_at));
const UPDATED_AT = new TableColumn(mapColumnDecoratorToTableColumn(NEWS_SOURCES_TABLE_COLUMNS.updated_at));
const URL = new TableColumn(mapColumnDecoratorToTableColumn(NEWS_SOURCES_TABLE_COLUMNS.url));
const TITLE = new TableColumn(mapColumnDecoratorToTableColumn(NEWS_SOURCES_TABLE_COLUMNS.title));
const SOURCE = new TableColumn(mapColumnDecoratorToTableColumn(NEWS_SOURCES_TABLE_COLUMNS.source));

const sources_table = new Table({
  name: NEWS_SOURCES_TABLE_NAME,
  columns: [UUID, CREATED_AT, UPDATED_AT, URL, TITLE, SOURCE],
});

const sources_categories_index_sources = new TableIndex({
  name: 'sources_categories_index_sources',
  columnNames: [NEWS_SOURCE_REFERENCED_COLUMN_NAME],
});

const sources_categories_index_categories = new TableIndex({
  name: 'sources_categories_index_categories',
  columnNames: [NEWS_CATEGORIES_REFERENCED_COLUMN_NAME],
});

const news_sources_foreign_key = new TableForeignKey({
  columnNames: [NEWS_SOURCE_REFERENCED_COLUMN_NAME],
  referencedTableName: NEWS_SOURCES_TABLE_NAME,
  referencedColumnNames: [NEWS_SOURCES_TABLE_COLUMNS.uuid.name],
  onDelete: 'CASCADE',
});

const news_categories_foreign_key = new TableForeignKey({
  columnNames: [NEWS_CATEGORIES_REFERENCED_COLUMN_NAME],
  referencedTableName: NEWS_CATEGORIES_TABLE_NAME,
  referencedColumnNames: [NEWS_CATEGORIES_TABLE_COLUMNS.uuid.name],
  onDelete: 'CASCADE',
});

const sources_categories_table = new Table({
  name: NEWS_SOURCE_CATEGORIES_TABLE_NAME,
  uniques: [
    {
      name: 'COMPOSITE_PRIMARY_KEY',
      columnNames: [NEWS_SOURCE_REFERENCED_COLUMN_NAME, NEWS_CATEGORIES_REFERENCED_COLUMN_NAME],
    },
  ],
  columns: [
    {
      name: NEWS_SOURCE_REFERENCED_COLUMN_NAME,
      type: 'uuid',
      isNullable: false,
      isPrimary: true,
    },
    {
      name: NEWS_CATEGORIES_REFERENCED_COLUMN_NAME,
      type: 'uuid',
      isNullable: false,
      isPrimary: true,
    },
  ],
  indices: [sources_categories_index_sources, sources_categories_index_categories],
  foreignKeys: [news_categories_foreign_key, news_sources_foreign_key],
});

export class CreateNewsSourcesTable1716638750328 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.startTransaction();
      await queryRunner.createTable(sources_table);
      await queryRunner.createTable(sources_categories_table);
      await queryRunner.commitTransaction();
    } catch {
      await queryRunner.rollbackTransaction();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.startTransaction();
      await queryRunner.dropForeignKeys(sources_categories_table, [
        news_sources_foreign_key,
        news_categories_foreign_key,
      ]);
      await queryRunner.dropIndices(sources_categories_table, [
        sources_categories_index_sources,
        sources_categories_index_categories,
      ]);
      await Promise.all([
        queryRunner.dropTable(sources_table),
        queryRunner.dropTable(sources_categories_table),
      ]);
      await queryRunner.commitTransaction();
    } catch {
      await queryRunner.rollbackTransaction();
    }
  }
}
