import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './articles.entity';
import { ArticlesRepositoryService } from './articles.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity])],
  providers: [ArticlesRepositoryService],
  exports: [ArticlesRepositoryService],
})
export class ArticlesRepositoryModule {}
