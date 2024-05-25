import { NEWS_CATEGORIES_TYPES } from './@enum';

export type NewsCategoriesEntityDTO = {
  name: string;
  key: string;
  type: NEWS_CATEGORIES_TYPES;
};
