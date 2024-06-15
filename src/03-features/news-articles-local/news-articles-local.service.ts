import { ArticlesRepositoryService } from '@/src/04-entities/articles-repository';
import { NewsCategoriesRepositoryService } from '@/src/04-entities/news-categories-repository';
import { Injectable } from '@nestjs/common';
import { ArticlesGetMany } from './@types';
import { ArticleRepositoryEntity } from '@/src/04-entities/articles-repository/articles-repository.entity';
import { UUID } from '@/src/05-shared/types/uuid';

@Injectable()
export class NewsArticlesLocalService {
  constructor(
    private readonly news_categories_repository_service: NewsCategoriesRepositoryService,
    private readonly articles_repository_service: ArticlesRepositoryService,
  ) {}

  async getMany(params: ArticlesGetMany): Promise<ArticleRepositoryEntity[]> {
    const filter_by: Array<{ categories: { uuid: UUID[][] } }> = [];

    if (params.filter_by?.categories) {
      const grouped_by_type_categories = await this.news_categories_repository_service.groupBy({
        uuids: params.filter_by?.categories.map((c) => c.uuid),
        group_by: 'type',
      });

      const categories_uuids = grouped_by_type_categories.map((g) =>
        g.grouped.map((category) => category.uuid),
      );

      filter_by.push({ categories: { uuid: categories_uuids } });
    }

    return this.articles_repository_service.getMany({
      page: params.page,
      query: params.query ?? null,
      size: params.size,
      sort: params.orderBy,
      filter_by,
    });
  }
}
