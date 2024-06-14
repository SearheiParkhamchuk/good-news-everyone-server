import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsCategoriesRepositoryEntity } from './news-categories-repository.entity';
import { Repository, FindManyOptions, In, FindOptionsWhere } from 'typeorm';
import {
  NEWS_CATEGORIES_TABLE_NAME,
  NEWS_CATEGORIES_TABLE_COLUMNS,
} from './news-categories-repository.schema';
import { NewsCategoriesGetMany } from './@types/NewsCategoriesGetMany';
import { GroupByResponse, NewsCategoriesGroupBy } from './@types/NewsCategoriesGroupBy';

@Injectable()
export class NewsCategoriesRepositoryService {
  constructor(
    @InjectRepository(NewsCategoriesRepositoryEntity)
    private readonly categories_repository: Repository<NewsCategoriesRepositoryEntity>,
  ) {}

  async getMany(options: NewsCategoriesGetMany = {}): Promise<NewsCategoriesRepositoryEntity[]> {
    const findManyOptions = {
      where: [] as FindOptionsWhere<NewsCategoriesRepositoryEntity>[],
    } satisfies FindManyOptions<NewsCategoriesRepositoryEntity>;

    if (options.uuids) findManyOptions.where.push({ uuid: In(options.uuids) });
    return this.categories_repository.find(findManyOptions);
  }

  async groupBy({ group_by, uuids = [] }: NewsCategoriesGroupBy): Promise<GroupByResponse> {
    const queryBuilder = this.categories_repository.createQueryBuilder(NEWS_CATEGORIES_TABLE_NAME);

    if (uuids.length) queryBuilder.andWhere('uuid IN (:...uuids)', { uuids });

    return queryBuilder
      .select(group_by)
      .addSelect(
        `
          jsonb_agg(
            row_to_json(${NEWS_CATEGORIES_TABLE_NAME})
            ORDER BY ${NEWS_CATEGORIES_TABLE_COLUMNS.name.name}
          )
        `,
        'grouped',
      )
      .groupBy(group_by)
      .getRawMany();
  }
}
