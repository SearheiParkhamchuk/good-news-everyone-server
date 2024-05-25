import { Column, Entity, BaseEntity } from 'typeorm';
import { ARTICLES_TABLE_COLUMNS, ARTICLES_TABLE_NAME } from './articles-repository.schema';
import { ArticleRemoteSourceMedia } from './@types';

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
}
