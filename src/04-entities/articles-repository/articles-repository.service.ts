import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository, DataSource, LessThanOrEqual, ILike } from 'typeorm';

import { ArticleRepositoryEntity } from './articles-repository.entity';
import { ArticleSourceDTO, ArticlesGetManyCriteria } from './@types';
import { ARTICLES_TABLE_COLUMNS, ARTICLES_TABLE_NAME } from './articles-repository.schema';
import { VIRTUAL_CATEGORIES_TABLE_NAME } from '../news-sources-repository/news-sources-repository.entity';

@Injectable()
export class ArticlesRepositoryService {
  constructor(
    @InjectRepository(ArticleRepositoryEntity)
    private readonly articles_respository: Repository<ArticleRepositoryEntity>,
    private readonly data_source: DataSource,
  ) {}

  async insertMany(articles: ArticleSourceDTO[]) {
    const query_runner = this.data_source.createQueryRunner();
    await query_runner.connect();
    await query_runner.startTransaction();

    try {
      const repository = query_runner.manager.getRepository(ArticleRepositoryEntity);
      const query_builder = repository.createQueryBuilder();
      const response = await query_builder
        .setLock('pessimistic_write')
        .insert()
        .values(articles)
        .orUpdate(['title', 'description', 'expire_at'])
        .orIgnore()
        .returning('*')
        .execute();

      await query_runner.commitTransaction();
      return response.raw as ArticleRepositoryEntity[];
    } catch (e) {
      await query_runner.rollbackTransaction();
      throw e;
    } finally {
      await query_runner.release();
    }
  }

  async getMany(options: ArticlesGetManyCriteria) {
    const queryBuilder = this.articles_respository.createQueryBuilder(ARTICLES_TABLE_NAME);

    if (options.query) {
      queryBuilder.where([
        { title: ILike(`%${options.query}%`) },
        { description: ILike(`%${options.query}%`) },
      ]);
    }

    if (options.sort) {
      queryBuilder.orderBy({ [options.sort.by]: options.sort.direction });
    }

    queryBuilder.offset(options.size * options.page).limit(options.size);

    const source_column = ARTICLES_TABLE_COLUMNS.source.name;

    if (options.filter_by) {
      options.filter_by.forEach((filter) => {
        if (filter.categories.uuid) {
          queryBuilder.innerJoinAndSelect(`${ARTICLES_TABLE_NAME}.${source_column}`, 'source');

          filter.categories.uuid.forEach((uuids, index) => {
            queryBuilder
              .innerJoin(`source.${VIRTUAL_CATEGORIES_TABLE_NAME}`, `categories_${index}`)
              .andWhere(`categories_${index}.uuid IN (:...uuids_${index})`, { [`uuids_${index}`]: uuids });
          });
        }
      });
    }

    return await queryBuilder.getMany();
  }

  async deleteExpired() {
    const expired = await this.articles_respository.findBy({ expire_at: LessThanOrEqual(new Date()) });
    const response = await this.articles_respository.remove(expired);
    return response;
  }
}
