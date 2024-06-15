import { Module } from '@nestjs/common';
import { NewsArticlesController } from './news-articles.controller';
import { NewsArticlesService } from './news-articles.service';
import { NewsArticlesLocalModule } from '@/src/03-features/news-articles-local';

@Module({
  controllers: [NewsArticlesController],
  providers: [NewsArticlesService],
  imports: [NewsArticlesLocalModule],
})
export class NewsArticlesModule {}
