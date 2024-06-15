import { Controller, Get, Query } from '@nestjs/common';
import { NewsCategoriesService } from './news-categories.service';
import { GroupByParamsTransformationPipe } from './pipes/params-transformation.pipe';
import { NewsCategoriesGetGroupedDto } from './dto/news-categories-get-grouped.dto';
import { ValidationPipe } from '@/src/05-shared/pipes/ValidationPipe';

@Controller('api/news-categories')
export class NewsCategoriesController {
  constructor(private readonly news_categories_service: NewsCategoriesService) {}

  @Get()
  async getAll() {
    return await this.news_categories_service.getMany();
  }

  @Get('group')
  async getGrouped(
    @Query(GroupByParamsTransformationPipe, new ValidationPipe())
    params: NewsCategoriesGetGroupedDto,
  ) {
    return await this.news_categories_service.groupBy(params);
  }
}
