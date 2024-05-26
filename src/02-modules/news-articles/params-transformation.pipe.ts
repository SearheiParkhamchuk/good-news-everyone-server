import { PipeTransform, Injectable } from '@nestjs/common';
import { ARTICLES_ORDER_BY } from './@enums/articles-order-by';
import { pickFirstSearchParameter } from '@/src/05-shared/utils/pick-first-search-parameter';
import { ARTICLES_QUERY_PARAMS } from './@enums/articles-query-params';
import { pickEnumSearchParameter } from '@/src/05-shared/utils/pick-enum-search-parameter';

export type ArticlesQueryParams = {
  query: string;
  page: number;
  size: number;
  sort: {
    by: string;
    direction: 'DESC' | 'ASC';
  };
};

const MIN_PAGE_SIZE = 1;
const MAX_PAGE_SIZE = 50;

const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = MIN_PAGE_SIZE;
const DEFAULT_ORDER = ARTICLES_ORDER_BY.NEWEST;

@Injectable()
export class ParamsTransformationPipe implements PipeTransform<object, ArticlesQueryParams> {
  transform(value: Record<string, string | string[]>): ArticlesQueryParams {
    const pageParameter = Number(pickFirstSearchParameter(value, ARTICLES_QUERY_PARAMS.PAGE));
    const sizeParameter = Number(pickFirstSearchParameter(value, ARTICLES_QUERY_PARAMS.PAGE_SIZE));
    const queryParameter = pickFirstSearchParameter(value, ARTICLES_QUERY_PARAMS.QUERY);
    const orderParameter =
      pickEnumSearchParameter(value, ARTICLES_ORDER_BY, ARTICLES_QUERY_PARAMS.ORDER_BY) ?? DEFAULT_ORDER;

    const page = isNaN(pageParameter) || pageParameter < 0 ? DEFAULT_PAGE : pageParameter;
    const size =
      isNaN(sizeParameter) || sizeParameter > MAX_PAGE_SIZE || sizeParameter < MIN_PAGE_SIZE
        ? DEFAULT_PAGE_SIZE
        : sizeParameter;
    return {
      query: queryParameter,
      page,
      size,
      sort: {
        by: 'published_at',
        direction: orderParameter === ARTICLES_ORDER_BY.NEWEST ? 'DESC' : 'ASC',
      },
    };
  }
}
