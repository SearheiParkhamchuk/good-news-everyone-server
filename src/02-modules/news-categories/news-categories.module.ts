import { NewsCategoriesRepositoryModule } from '@/src/04-entities/news-categories-repository';
import { Module } from '@nestjs/common';
import { NewsCategoriesService } from './news-categories.service';
import { NewsCategoriesController } from './news-categories.controller';

@Module({
  controllers: [NewsCategoriesController],
  providers: [NewsCategoriesService],
  imports: [NewsCategoriesRepositoryModule],
})
export class NewsCategoriesModule {}
