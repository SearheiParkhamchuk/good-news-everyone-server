import { Column, Entity, Index } from 'typeorm';
import {
  NEWS_CATEGORIES_TABLE_COLUMNS,
  NEWS_CATEGORIES_TABLE_NAME,
} from './news-categories-repository.schema';
import { BaseEntity } from '@/src/05-shared/db/BaseEntity.abstract';
import { NEWS_CATEGORIES_TYPES } from './@enum';

@Entity(NEWS_CATEGORIES_TABLE_NAME)
@Index([NEWS_CATEGORIES_TABLE_COLUMNS.type.name, NEWS_CATEGORIES_TABLE_COLUMNS.key.name], { unique: true })
export class NewsCategoriesRepositoryEntity extends BaseEntity<NewsCategoriesRepositoryEntity> {
  @Column(NEWS_CATEGORIES_TABLE_COLUMNS.uuid)
  uuid: string;

  @Column(NEWS_CATEGORIES_TABLE_COLUMNS.name)
  name: string;

  @Column(NEWS_CATEGORIES_TABLE_COLUMNS.key)
  key: string;

  @Column(NEWS_CATEGORIES_TABLE_COLUMNS.type)
  type: NEWS_CATEGORIES_TYPES;
}
