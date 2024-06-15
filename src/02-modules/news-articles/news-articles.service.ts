import { NewsArticlesLocalService } from '@/src/03-features/news-articles-local';
import { Injectable } from '@nestjs/common';
import { GetManyQueryParamsDto } from './dto/GetManyQueryParams.dto';

@Injectable()
export class NewsArticlesService {
  constructor(private readonly news_articles_local_service: NewsArticlesLocalService) {}

  async getMany(options: GetManyQueryParamsDto) {
    return this.news_articles_local_service.getMany(options);
  }
}
