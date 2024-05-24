import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ArticleEntity } from './articles.entity';

@Injectable()
export class ArticlesRepositoryService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly respository: Repository<ArticleEntity>,
  ) {}
}
