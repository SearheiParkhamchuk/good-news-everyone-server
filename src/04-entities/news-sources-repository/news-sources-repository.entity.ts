import { Entity, Column, ManyToMany, JoinTable, BaseEntity } from 'typeorm';
import {
  NEWS_SOURCES_TABLE_COLUMNS,
  NEWS_SOURCES_TABLE_NAME,
  NEWS_SOURCE_REFERENCED_COLUMN_NAME,
} from './news-sources-repository.schema';
import { NewsCategoriesRepositoryEntity } from '../news-categories-repository/news-categories-repository.entity';
import { NEWS_CATEGORIES_REFERENCED_COLUMN_NAME } from '../news-categories-repository/news-categories-repository.schema';

@Entity(NEWS_SOURCES_TABLE_NAME)
export class NewsSourcesRepositoryEntity extends BaseEntity {
  @Column(NEWS_SOURCES_TABLE_COLUMNS.uuid)
  uuid: string;

  @Column(NEWS_SOURCES_TABLE_COLUMNS.created_at)
  created_at: string;

  @Column(NEWS_SOURCES_TABLE_COLUMNS.updated_at)
  updated_at: string;

  @Column(NEWS_SOURCES_TABLE_COLUMNS.url)
  url: string;

  @Column(NEWS_SOURCES_TABLE_COLUMNS.name)
  name: string;

  @ManyToMany(() => NewsCategoriesRepositoryEntity, (categories) => categories.news_sources, { eager: true })
  @JoinTable({
    name: 'news_sources_categories',
    joinColumn: {
      name: NEWS_SOURCE_REFERENCED_COLUMN_NAME,
      referencedColumnName: 'uuid',
    },
    inverseJoinColumn: {
      name: NEWS_CATEGORIES_REFERENCED_COLUMN_NAME,
      referencedColumnName: 'uuid',
    },
  })
  categories: NewsCategoriesRepositoryEntity[];
}
