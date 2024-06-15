import { Controller, Get, Query } from '@nestjs/common';
import { NewsArticlesService } from './news-articles.service';
import { ParamsTransformationPipe } from './pipes/params-transformation.pipe';
import { GetManyQueryParamsDto } from './dto/GetManyQueryParams.dto';
import { ValidationPipe } from '@/src/05-shared/pipes/ValidationPipe';

@Controller('api/articles')
export class NewsArticlesController {
  constructor(private readonly articles_service: NewsArticlesService) {}

  @Get()
  async getArticles(
    @Query(ParamsTransformationPipe, new ValidationPipe())
    params: GetManyQueryParamsDto,
  ) {
    return await this.articles_service.getMany(params);
  }
}
