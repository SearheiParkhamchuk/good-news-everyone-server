import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleRepositoryEntity } from './articles-repository.entity';
import { ArticlesRepositoryService } from './articles-repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleRepositoryEntity])],
  providers: [ArticlesRepositoryService],
  exports: [ArticlesRepositoryService],
})
export class ArticlesRepositoryModule {}
