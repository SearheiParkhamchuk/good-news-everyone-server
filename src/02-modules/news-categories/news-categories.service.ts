import { NewsCategoriesRepositoryService } from '@/src/04-entities/news-categories-repository';
import { Injectable } from '@nestjs/common';
import { NewsCategoriesGetGroupedDto } from './dto/news-categories-get-grouped.dto';

@Injectable()
export class NewsCategoriesService {
  constructor(private readonly news_categories_service: NewsCategoriesRepositoryService) {}

  async getMany() {
    return await this.news_categories_service.getMany();
  }

  async groupBy({ group_by }: NewsCategoriesGetGroupedDto) {
    return await this.news_categories_service.groupBy({ group_by });
  }
}
