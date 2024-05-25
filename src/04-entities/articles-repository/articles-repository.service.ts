import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ArticleRepositoryEntity } from './articles-repository.entity';

@Injectable()
export class ArticlesRepositoryService {
  constructor(
    @InjectRepository(ArticleRepositoryEntity)
    private readonly respository: Repository<ArticleRepositoryEntity>,
  ) {}
}
