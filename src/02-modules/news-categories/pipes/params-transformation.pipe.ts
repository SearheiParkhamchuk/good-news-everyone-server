import { PipeTransform, Injectable } from '@nestjs/common';
import { NEWS_CATEGORIES_GROUP } from '../@enums/news-categories-group-by';
import { NES_CATEGORIES_QUERY_PARAMS } from '../@enums/news-categories-query-params';
import { pickEnumSearchParameter } from '@/src/05-shared/utils/pick-enum-search-parameter';

type NewsCategoriesGroupByQueryParams = {
  group_by?: string;
};

@Injectable()
export class GroupByParamsTransformationPipe
  implements PipeTransform<object, NewsCategoriesGroupByQueryParams>
{
  transform(value: Record<string, string | string[]>): NewsCategoriesGroupByQueryParams {
    const group_by = pickEnumSearchParameter(
      value,
      NEWS_CATEGORIES_GROUP,
      NES_CATEGORIES_QUERY_PARAMS.GROUP_BY,
    );

    return { group_by };
  }
}
