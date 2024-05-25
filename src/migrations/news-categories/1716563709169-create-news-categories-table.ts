import { MigrationInterface, QueryRunner, TableColumn, Table } from 'typeorm';
import { mapColumnDecoratorToTableColumn } from '../@helpers/map-column-decorator-to-table-column.helper';
import {
  NEWS_CATEGORIES_TABLE_COLUMNS,
  NEWS_CATEGORIES_TABLE_NAME,
} from '@/src/04-entities/news-categories-repository/news-categories-repository.schema';

const UUID = new TableColumn(mapColumnDecoratorToTableColumn(NEWS_CATEGORIES_TABLE_COLUMNS.uuid));
const NAME = new TableColumn(mapColumnDecoratorToTableColumn(NEWS_CATEGORIES_TABLE_COLUMNS.name));
const KEY = new TableColumn(mapColumnDecoratorToTableColumn(NEWS_CATEGORIES_TABLE_COLUMNS.key));
const TYPE = new TableColumn(mapColumnDecoratorToTableColumn(NEWS_CATEGORIES_TABLE_COLUMNS.type));

export class CreateNewsCategoriesTable1716563709169 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: NEWS_CATEGORIES_TABLE_NAME,
        columns: [UUID, NAME, KEY, TYPE],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(NEWS_CATEGORIES_TABLE_NAME);
  }
}
