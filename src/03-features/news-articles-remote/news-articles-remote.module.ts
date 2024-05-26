import { Module } from '@nestjs/common';
import { NewsArticlesRemoteService } from './news-articles-remote.service';
import { NewsSourcesReceiverModule } from '@/src/04-entities/news-sources-receiver';
import { NewsSourcesRepositoryModule } from '@/src/04-entities/news-sources-repository';

@Module({
  controllers: [],
  providers: [NewsArticlesRemoteService],
  imports: [NewsSourcesReceiverModule, NewsSourcesRepositoryModule],
  exports: [NewsArticlesRemoteService],
})
export class NewsArticlesRemoteModule {}
