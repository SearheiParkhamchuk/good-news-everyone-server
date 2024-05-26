import { Column, Entity, Index, ManyToMany, BaseEntity } from 'typeorm';
import {
  NEWS_CATEGORIES_TABLE_COLUMNS,
  NEWS_CATEGORIES_TABLE_NAME,
} from './news-categories-repository.schema';

import { NEWS_CATEGORIES_TYPES } from './@enum';
import { NewsSourcesRepositoryEntity } from '../news-sources-repository/news-sources-repository.entity';

@Entity(NEWS_CATEGORIES_TABLE_NAME)
@Index([NEWS_CATEGORIES_TABLE_COLUMNS.type.name, NEWS_CATEGORIES_TABLE_COLUMNS.key.name], { unique: true })
export class NewsCategoriesRepositoryEntity extends BaseEntity {
  @Column(NEWS_CATEGORIES_TABLE_COLUMNS.uuid)
  uuid: string;

  @Column(NEWS_CATEGORIES_TABLE_COLUMNS.name)
  name: string;

  @Column(NEWS_CATEGORIES_TABLE_COLUMNS.key)
  key: string;

  @Column(NEWS_CATEGORIES_TABLE_COLUMNS.type)
  type: NEWS_CATEGORIES_TYPES;

  @ManyToMany(() => NewsSourcesRepositoryEntity, (source) => source.categories)
  news_sources: NewsSourcesRepositoryEntity[];

  constructor(entity: Partial<NewsCategoriesRepositoryEntity> = {}) {
    super();
    Object.assign(this, entity);
  }
}
