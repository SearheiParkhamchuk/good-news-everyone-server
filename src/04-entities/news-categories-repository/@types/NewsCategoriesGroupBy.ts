import { type NewsCategoriesRepositoryEntity } from '../news-categories-repository.entity';
import { type NEWS_CATEGORIES_TABLE_COLUMNS } from '../news-categories-repository.schema';

export type NewsCategoriesGroupBy = {
  uuids?: string[];
  group_by: GroupBy;
};

type GroupBy = keyof typeof NEWS_CATEGORIES_TABLE_COLUMNS;
export type GroupByResponse = Array<
  {
    [key in GroupBy]: string;
  } & {
    grouped: NewsCategoriesRepositoryEntity[];
  }
>;
