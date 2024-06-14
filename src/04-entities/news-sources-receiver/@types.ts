import { NEWS_REPOSITORY_SOURCES } from '../news-sources-repository/@enums';

export type ArticleRemoteSourceMedia = {
  height?: string;
  url: string;
  width?: string;
};

export type ArticleRemoteSource = {
  media: {
    images: ArticleRemoteSourceMedia[];
  };
  published_at: Date;
  source_url: string;
  source_name: string;
  title: string;
  description?: string;
  id?: string;
  thumbnail?: string;
};

export type GetSourcesCriteria<M extends object> = {
  sources: Array<{
    url: string;
    source: NEWS_REPOSITORY_SOURCES;
    metadata?: M;
  }>;
};
