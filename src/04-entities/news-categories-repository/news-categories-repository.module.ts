import { Module } from '@nestjs/common';
import { NewsCategoriesRepositoryService } from './news-categories-repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsCategoriesRepositoryEntity } from './news-categories-repository.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NewsCategoriesRepositoryEntity])],
  providers: [NewsCategoriesRepositoryService],
  exports: [NewsCategoriesRepositoryService],
  controllers: [],
})
export class NewsCategoriesRepositoryModule {}
