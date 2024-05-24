import { MigrationInterface, QueryRunner, TableColumn, Table } from 'typeorm';
import { mapColumnDecoratorToTableColumn } from '../@helpers/map-column-decorator-to-table-column.helper';
import { ARTICLES_TABLE_COLUMNS, ARTICLES_TABLE_NAME } from '@/src/04-entities/articles/articles.schema';

const UUID = new TableColumn(mapColumnDecoratorToTableColumn(ARTICLES_TABLE_COLUMNS.uuid));
const CREATED_AT = new TableColumn(mapColumnDecoratorToTableColumn(ARTICLES_TABLE_COLUMNS.created_at));
const UPDATED_AT = new TableColumn(mapColumnDecoratorToTableColumn(ARTICLES_TABLE_COLUMNS.updated_at));
const PUBLISHED_AT = new TableColumn(mapColumnDecoratorToTableColumn(ARTICLES_TABLE_COLUMNS.published_at));
const EXPIRE_AT = new TableColumn(mapColumnDecoratorToTableColumn(ARTICLES_TABLE_COLUMNS.expire_at));
const DESCRIPTION = new TableColumn(mapColumnDecoratorToTableColumn(ARTICLES_TABLE_COLUMNS.description));
const ID = new TableColumn(mapColumnDecoratorToTableColumn(ARTICLES_TABLE_COLUMNS.id));
const MEDIA = new TableColumn(mapColumnDecoratorToTableColumn(ARTICLES_TABLE_COLUMNS.media));
const SOURCE = new TableColumn(mapColumnDecoratorToTableColumn(ARTICLES_TABLE_COLUMNS.source));
const SOURCE_NAME = new TableColumn(mapColumnDecoratorToTableColumn(ARTICLES_TABLE_COLUMNS.source_name));
const THUMBNAIL = new TableColumn(mapColumnDecoratorToTableColumn(ARTICLES_TABLE_COLUMNS.thumbnail));

export class CreateArticlesTable1716558248888 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: ARTICLES_TABLE_NAME,
        columns: [
          UUID,
          ID,
          CREATED_AT,
          UPDATED_AT,
          PUBLISHED_AT,
          EXPIRE_AT,
          DESCRIPTION,
          SOURCE,
          SOURCE_NAME,
          THUMBNAIL,
          MEDIA,
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(ARTICLES_TABLE_NAME);
  }
}