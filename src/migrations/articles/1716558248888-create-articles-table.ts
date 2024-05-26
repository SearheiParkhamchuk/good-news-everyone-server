import { MigrationInterface, QueryRunner, TableColumn, Table } from 'typeorm';
import { mapColumnDecoratorToTableColumn } from '../@helpers/map-column-decorator-to-table-column.helper';
import {
  ARTICLES_TABLE_COLUMNS,
  ARTICLES_TABLE_NAME,
} from '@/src/04-entities/articles-repository/articles-repository.schema';

const UUID = new TableColumn(mapColumnDecoratorToTableColumn(ARTICLES_TABLE_COLUMNS.uuid));
const CREATED_AT = new TableColumn(mapColumnDecoratorToTableColumn(ARTICLES_TABLE_COLUMNS.created_at));
const UPDATED_AT = new TableColumn(mapColumnDecoratorToTableColumn(ARTICLES_TABLE_COLUMNS.updated_at));
const PUBLISHED_AT = new TableColumn(mapColumnDecoratorToTableColumn(ARTICLES_TABLE_COLUMNS.published_at));
const EXPIRE_AT = new TableColumn(mapColumnDecoratorToTableColumn(ARTICLES_TABLE_COLUMNS.expire_at));
const DESCRIPTION = new TableColumn(mapColumnDecoratorToTableColumn(ARTICLES_TABLE_COLUMNS.description));
const ID = new TableColumn(mapColumnDecoratorToTableColumn(ARTICLES_TABLE_COLUMNS.id));
const MEDIA = new TableColumn(mapColumnDecoratorToTableColumn(ARTICLES_TABLE_COLUMNS.media));
const SOURCE_URL = new TableColumn(mapColumnDecoratorToTableColumn(ARTICLES_TABLE_COLUMNS.source_url));
const SOURCE_NAME = new TableColumn(mapColumnDecoratorToTableColumn(ARTICLES_TABLE_COLUMNS.source_name));
const THUMBNAIL = new TableColumn(mapColumnDecoratorToTableColumn(ARTICLES_TABLE_COLUMNS.thumbnail));
const TITLE = new TableColumn(mapColumnDecoratorToTableColumn(ARTICLES_TABLE_COLUMNS.title));

export class CreateArticlesTable1716558248888 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: ARTICLES_TABLE_NAME,
        columns: [
          UUID,
          ID,
          SOURCE_NAME,
          TITLE,
          SOURCE_URL,
          PUBLISHED_AT,
          EXPIRE_AT,
          DESCRIPTION,
          THUMBNAIL,
          MEDIA,
          CREATED_AT,
          UPDATED_AT,
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(ARTICLES_TABLE_NAME);
  }
}
