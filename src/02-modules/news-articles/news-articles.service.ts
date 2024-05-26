import { ArticlesRepositoryService } from '@/src/04-entities/articles-repository';
import { ArticlesGetManyCriteria } from '@/src/04-entities/articles-repository/@types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NewsArticlesService {
  constructor(private readonly news_articles_repository: ArticlesRepositoryService) {}

  async getMany(options: ArticlesGetManyCriteria) {
    return this.news_articles_repository.getMany(options);
  }
}
