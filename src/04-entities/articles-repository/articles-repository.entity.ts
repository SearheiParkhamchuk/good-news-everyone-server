import { Column, Entity, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import {
  ARTICLES_TABLE_COLUMNS,
  ARTICLES_TABLE_NAME,
  ARTICLES_TABLE_SOURCE_FOREIGN_KEY,
} from './articles-repository.schema';
import { ArticleRemoteSourceMedia } from '../news-sources-receiver/@types';
import { NewsSourcesRepositoryEntity } from '../news-sources-repository/news-sources-repository.entity';

@Entity(ARTICLES_TABLE_NAME)
export class ArticleRepositoryEntity extends BaseEntity {
  @Column(ARTICLES_TABLE_COLUMNS.uuid)
  uuid: string;

  @Column(ARTICLES_TABLE_COLUMNS.published_at)
  published_at: Date;

  @Column(ARTICLES_TABLE_COLUMNS.created_at)
  created_at: Date;

  @Column(ARTICLES_TABLE_COLUMNS.id)
  id: string;

  @Column(ARTICLES_TABLE_COLUMNS.description)
  description: string | null;

  @Column(ARTICLES_TABLE_COLUMNS.thumbnail)
  thumbnail?: string;

  @Column(ARTICLES_TABLE_COLUMNS.title)
  title: string;

  @Column(ARTICLES_TABLE_COLUMNS.source_url)
  source_url: string;

  @Column(ARTICLES_TABLE_COLUMNS.source_name)
  source_name: string;

  @Column(ARTICLES_TABLE_COLUMNS.media)
  media: { images: ArticleRemoteSourceMedia[] };

  @Column(ARTICLES_TABLE_COLUMNS.expire_at)
  expire_at: Date;

  @ManyToOne(() => NewsSourcesRepositoryEntity, (entity) => entity.categories)
  @JoinColumn({ name: 'source', foreignKeyConstraintName: ARTICLES_TABLE_SOURCE_FOREIGN_KEY })
  source: NewsSourcesRepositoryEntity;

  constructor(entity: Partial<ArticleRepositoryEntity> = {}) {
    super();
    Object.assign(this, entity);
  }
}
