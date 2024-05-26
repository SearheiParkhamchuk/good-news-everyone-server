import { Controller, Get, Query } from '@nestjs/common';
import { NewsArticlesService } from './news-articles.service';
import { ArticlesQueryParams, ParamsTransformationPipe } from './params-transformation.pipe';

@Controller('api/articles')
export class NewsArticlesController {
  constructor(private readonly articles_service: NewsArticlesService) {}

  @Get()
  async getArticles(@Query(ParamsTransformationPipe) params: ArticlesQueryParams) {
    const response = await this.articles_service.getMany(params);
    return { data: response };
  }
}
