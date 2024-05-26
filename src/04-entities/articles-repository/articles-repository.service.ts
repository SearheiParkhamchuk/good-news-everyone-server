import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, DataSource, LessThanOrEqual, ILike } from 'typeorm';

import { ArticleRepositoryEntity } from './articles-repository.entity';
import { ArticleSourceDTO, ArticlesGetManyCriteria } from './@types';

@Injectable()
export class ArticlesRepositoryService {
  constructor(
    @InjectRepository(ArticleRepositoryEntity)
    private readonly articles_respository: Repository<ArticleRepositoryEntity>,
    private readonly data_source: DataSource,
  ) {}

  async insertMany(articles: ArticleSourceDTO[]) {
    const query_runner = this.data_source.createQueryRunner();

    try {
      await query_runner.startTransaction();
      const repository = query_runner.manager.getRepository(ArticleRepositoryEntity);
      const query_builder = repository.createQueryBuilder();
      const response = await query_builder
        .insert()
        .values(articles)
        .orUpdate(['title', 'description', 'expire_at'])
        .orIgnore()
        .returning('*')
        .execute();

      await query_runner.commitTransaction();
      return response.raw;
    } catch (e) {
      await query_runner.rollbackTransaction();
      console.log(e);
      throw e;
    }
  }

  async getMany(options: ArticlesGetManyCriteria) {
    const order = options.sort ? { [options.sort.by]: options.sort.direction } : undefined;
    const result = await this.articles_respository.find({
      where: [{ title: ILike(`%${options.query}%`) }, { description: ILike(`%${options.query}%`) }],
      order,
      take: options.size,
      skip: options.size * options.page,
    });

    return result;
  }

  async deleteExpired() {
    const expired = await this.articles_respository.findBy({ expire_at: LessThanOrEqual(new Date()) });
    const response = await this.articles_respository.remove(expired);
    return response;
  }
}
