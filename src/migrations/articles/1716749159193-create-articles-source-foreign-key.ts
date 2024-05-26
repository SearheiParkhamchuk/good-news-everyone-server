import {
  ARTICLES_TABLE_COLUMNS,
  ARTICLES_TABLE_NAME,
} from '@/src/04-entities/articles-repository/articles-repository.schema';
import {
  NEWS_SOURCES_TABLE_COLUMNS,
  NEWS_SOURCES_TABLE_NAME,
} from '@/src/04-entities/news-sources-repository/news-sources-repository.schema';
import { MigrationInterface, QueryRunner, TableForeignKey, TableColumn } from 'typeorm';
import { mapColumnDecoratorToTableColumn } from '../@helpers/map-column-decorator-to-table-column.helper';

const ARTICLE_SOURCE_FOREIGN_KEY = new TableForeignKey({
  name: 'article_source_foreign_key',
  columnNames: [ARTICLES_TABLE_COLUMNS.source.name],
  referencedTableName: NEWS_SOURCES_TABLE_NAME,
  referencedColumnNames: [NEWS_SOURCES_TABLE_COLUMNS.uuid.name],
});

const SOURCE = new TableColumn(mapColumnDecoratorToTableColumn(ARTICLES_TABLE_COLUMNS.source));

export class CreateArticlesSourceForeignKey1716749159193 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(ARTICLES_TABLE_NAME, SOURCE);
    await queryRunner.createForeignKey(ARTICLES_TABLE_NAME, ARTICLE_SOURCE_FOREIGN_KEY);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(ARTICLES_TABLE_NAME, ARTICLE_SOURCE_FOREIGN_KEY);
  }
}
