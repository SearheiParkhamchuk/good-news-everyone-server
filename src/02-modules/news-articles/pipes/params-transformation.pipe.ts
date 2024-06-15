import { PipeTransform, Injectable } from '@nestjs/common';
import { ARTICLES_ORDER_BY } from '../@enums/articles-order-by';
import { ARTICLES_QUERY_PARAMS } from '../@enums/articles-query-params';
import { pickFirstSearchParameter } from '@/src/05-shared/utils/pick-first-search-parameter';
import { pickEnumSearchParameter } from '@/src/05-shared/utils/pick-enum-search-parameter';
import { UUID } from '@/src/05-shared/types/uuid';

type ArticlesQueryParams = {
  query?: string;
  page: number;
  size: number;
  orderBy?: {
    by: 'published_at';
    direction: 'ASC' | 'DESC';
  };
  filter_by?: {
    categories?: Array<{ uuid: UUID }>;
  };
};

@Injectable()
export class ParamsTransformationPipe implements PipeTransform<object, ArticlesQueryParams> {
  transform(value: Record<string, string | string[]>): ArticlesQueryParams {
    const page = Number(pickFirstSearchParameter(value, ARTICLES_QUERY_PARAMS.PAGE));
    const size = Number(pickFirstSearchParameter(value, ARTICLES_QUERY_PARAMS.PAGE_SIZE));
    const query = pickFirstSearchParameter(value, ARTICLES_QUERY_PARAMS.QUERY);
    const orderBy = pickEnumSearchParameter(value, ARTICLES_ORDER_BY, ARTICLES_QUERY_PARAMS.ORDER_BY);
    const filterByCategories = pickFirstSearchParameter(value, ARTICLES_QUERY_PARAMS.FILTER_BY_CATEGORIES);

    return {
      query,
      page,
      size,
      orderBy: {
        by: 'published_at',
        direction: orderBy === ARTICLES_ORDER_BY.OLDEST ? 'ASC' : 'DESC',
      },
      filter_by: {
        categories: filterByCategories?.trim()
          ? filterByCategories.split(',').map((uuid) => ({ uuid }))
          : undefined,
      },
    };
  }
}
