import { ArticleRemoteSource } from '../news-sources-receiver/@types';
import { NewsSourcesRepositoryEntity } from '../news-sources-repository/news-sources-repository.entity';

export type ArticleLocalSource = ArticleRemoteSource & {
  created_at: Date;
  expire_at: Date;
  uuid: string;
};

export type ArticleLocalSourceDehydrated = ArticleLocalSource & {
  media: string;
  source: string;
};

export type ArticleSourceDTO = ArticleRemoteSource & {
  expire_at: Date;
  source: NewsSourcesRepositoryEntity;
};

export type ArticlesGetManyCriteria = {
  page: number;
  query: string | null;
  size: number;
  sort?: {
    by: string;
    direction?: 'ASC' | 'DESC';
  };
};
