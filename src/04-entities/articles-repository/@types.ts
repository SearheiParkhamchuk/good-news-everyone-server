export type ArticleRemoteSourceMedia = {
  height: string;
  url: string;
  width: string;
};

export type ArticleRemoteSource = {
  media: {
    images: ArticleRemoteSourceMedia[];
  };
  published_at: Date;
  source: string;
  source_name: string;
  title: string;
  description?: string;
  id?: string;
  thumbnail?: string;
};

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
};
