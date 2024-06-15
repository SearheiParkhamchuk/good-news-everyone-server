import { IsEnum, IsNotEmpty } from 'class-validator';
import { NEWS_CATEGORIES_GROUP } from '../@enums/news-categories-group-by';

export class NewsCategoriesGetGroupedDto {
  @IsEnum(NEWS_CATEGORIES_GROUP)
  @IsNotEmpty()
  group_by: NEWS_CATEGORIES_GROUP;
}
