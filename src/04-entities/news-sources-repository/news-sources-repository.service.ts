import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsSourcesRepositoryEntity } from './news-sources-repository.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewsSourcesRepositoryService {
  constructor(
    @InjectRepository(NewsSourcesRepositoryEntity)
    private readonly news_sources_repository: Repository<NewsSourcesRepositoryEntity>,
  ) {}

  async getAll() {
    return this.news_sources_repository.find();
  }
}
