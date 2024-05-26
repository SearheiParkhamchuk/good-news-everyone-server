import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsSourcesRepositoryEntity } from './news-sources-repository.entity';
import { NewsSourcesRepositoryService } from './news-sources-repository.service';

@Module({
  controllers: [],
  providers: [NewsSourcesRepositoryService],
  imports: [TypeOrmModule.forFeature([NewsSourcesRepositoryEntity])],
  exports: [NewsSourcesRepositoryService],
})
export class NewsSourcesRepositoryModule {}
