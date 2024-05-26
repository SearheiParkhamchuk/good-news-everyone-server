import { Entity, Column, ManyToMany, JoinTable, BaseEntity, OneToMany } from 'typeorm';
import {
  NEWS_SOURCES_TABLE_COLUMNS,
  NEWS_SOURCES_TABLE_NAME,
  NEWS_SOURCE_REFERENCED_COLUMN_NAME,
} from './news-sources-repository.schema';
import { NewsCategoriesRepositoryEntity } from '../news-categories-repository/news-categories-repository.entity';
import { NEWS_CATEGORIES_REFERENCED_COLUMN_NAME } from '../news-categories-repository/news-categories-repository.schema';
import { NEWS_REPOSITORY_SOURCES } from './@enums';
import { ArticleRepositoryEntity } from '../articles-repository/articles-repository.entity';

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

  @Column(NEWS_SOURCES_TABLE_COLUMNS.title)
  title: string;

  @Column(NEWS_SOURCES_TABLE_COLUMNS.source)
  source: NEWS_REPOSITORY_SOURCES;

  @OneToMany(() => ArticleRepositoryEntity, (article) => article.source)
  articles: ArticleRepositoryEntity;

  @ManyToMany(() => NewsCategoriesRepositoryEntity, (categories) => categories.news_sources)
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
