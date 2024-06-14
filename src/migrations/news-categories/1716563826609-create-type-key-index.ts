import {
  NEWS_CATEGORIES_TABLE_COLUMNS,
  NEWS_CATEGORIES_TABLE_NAME,
} from '@/src/04-entities/news-categories-repository/news-categories-repository.schema';
import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

const type_key_index = new TableIndex({
  name: 'type_key_index',
  columnNames: [NEWS_CATEGORIES_TABLE_COLUMNS.key.name, NEWS_CATEGORIES_TABLE_COLUMNS.type.name],
  isUnique: true,
});

export class CreateTypeKeyIndex1716563826609 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex(NEWS_CATEGORIES_TABLE_NAME, type_key_index);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(NEWS_CATEGORIES_TABLE_NAME, type_key_index);
  }
}
