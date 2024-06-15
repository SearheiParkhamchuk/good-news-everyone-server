import { Module } from '@nestjs/common';
import { NewsArticlesLocalService } from './news-articles-local.service';
import { NewsCategoriesRepositoryModule } from '@/src/04-entities/news-categories-repository';
import { ArticlesRepositoryModule } from '@/src/04-entities/articles-repository';

@Module({
  controllers: [],
  providers: [NewsArticlesLocalService],
  exports: [NewsArticlesLocalService],
  imports: [NewsCategoriesRepositoryModule, ArticlesRepositoryModule],
})
export class NewsArticlesLocalModule {}
