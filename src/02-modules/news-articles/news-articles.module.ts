import { ArticlesRepositoryModule } from '@/src/04-entities/articles-repository';
import { Module } from '@nestjs/common';
import { NewsArticlesController } from './news-articles.controller';
import { NewsArticlesService } from './news-articles.service';

@Module({
  controllers: [NewsArticlesController],
  providers: [NewsArticlesService],
  imports: [ArticlesRepositoryModule],
})
export class NewsArticlesModule {}
