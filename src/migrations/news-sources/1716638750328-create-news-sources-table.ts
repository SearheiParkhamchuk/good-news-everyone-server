import {
  NEWS_SOURCES_TABLE_COLUMNS,
  NEWS_SOURCES_TABLE_NAME,
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

const news_sources_table = new Table({
  name: NEWS_SOURCES_TABLE_NAME,
  columns: [UUID, CREATED_AT, UPDATED_AT, URL, TITLE, SOURCE],
});

const news_sources_and_categories_table_index = new TableIndex({
  name: 'news_sources_and_categories_table_index',
  columnNames: [NEWS_SOURCE_REFERENCED_COLUMN_NAME, NEWS_CATEGORIES_REFERENCED_COLUMN_NAME],
  isUnique: true,
});

const news_sources_foreign_key = new TableForeignKey({
  columnNames: [NEWS_SOURCE_REFERENCED_COLUMN_NAME],
  referencedTableName: NEWS_SOURCES_TABLE_NAME,
  referencedColumnNames: [NEWS_SOURCES_TABLE_COLUMNS.uuid.name],
});

const news_categories_foreign_key = new TableForeignKey({
  columnNames: [NEWS_CATEGORIES_REFERENCED_COLUMN_NAME],
  referencedTableName: NEWS_CATEGORIES_TABLE_NAME,
  referencedColumnNames: [NEWS_CATEGORIES_TABLE_COLUMNS.uuid.name],
});

const news_sources_and_categories_table = new Table({
  name: 'news_sources_categories',
  columns: [
    {
      name: NEWS_SOURCE_REFERENCED_COLUMN_NAME,
      type: 'uuid',
      isNullable: false,
    },
    {
      name: NEWS_CATEGORIES_REFERENCED_COLUMN_NAME,
      type: 'uuid',
      isNullable: false,
    },
  ],
  indices: [news_sources_and_categories_table_index],
  foreignKeys: [news_categories_foreign_key, news_sources_foreign_key],
});

export class CreateNewsSourcesTable1716638750328 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.startTransaction();
      await queryRunner.createTable(news_sources_table);
      await queryRunner.createTable(news_sources_and_categories_table);
      await queryRunner.commitTransaction();
    } catch {
      await queryRunner.rollbackTransaction();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.startTransaction();
      await queryRunner.dropForeignKeys(news_sources_and_categories_table, [
        news_sources_foreign_key,
        news_categories_foreign_key,
      ]);
      await queryRunner.dropIndex(news_sources_and_categories_table, news_sources_and_categories_table_index);
      await Promise.all([
        queryRunner.dropTable(news_sources_table),
        queryRunner.dropTable(news_sources_and_categories_table),
      ]);
      await queryRunner.commitTransaction();
    } catch {
      await queryRunner.rollbackTransaction();
    }
  }
}
