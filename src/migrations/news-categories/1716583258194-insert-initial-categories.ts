import { NEWS_CATEGORIES_TYPES } from '@/src/04-entities/news-categories-repository/@enum';
import { NewsCategoriesEntityDTO } from '@/src/04-entities/news-categories-repository/@types';
import { NewsCategoriesRepositoryEntity } from '@/src/04-entities/news-categories-repository/news-categories-repository.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

const INITIAL_VALUES_LOCATION: NewsCategoriesEntityDTO[] = [
  { type: NEWS_CATEGORIES_TYPES.LOCATION, key: 'all', name: 'All' },
  { type: NEWS_CATEGORIES_TYPES.LOCATION, key: 'world', name: 'World' },
  { type: NEWS_CATEGORIES_TYPES.LOCATION, key: 'europe', name: 'Europe' },
  { type: NEWS_CATEGORIES_TYPES.LOCATION, key: 'africa', name: 'Africa' },
  { type: NEWS_CATEGORIES_TYPES.LOCATION, key: 'australia', name: 'Australia' },
  { type: NEWS_CATEGORIES_TYPES.LOCATION, key: 'asia', name: 'Asia' },
  { type: NEWS_CATEGORIES_TYPES.LOCATION, key: 'north_america', name: 'North America' },
  { type: NEWS_CATEGORIES_TYPES.LOCATION, key: 'south_america', name: 'South America' },
];

const INITIAL_VALUES_TOPICS: NewsCategoriesEntityDTO[] = [
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: 'all', name: 'All' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: 'politics', name: 'Politics' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: 'economy', name: 'Economy' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: 'technology', name: 'Technology' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: 'science', name: 'Science' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: 'health', name: 'Health' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: 'education', name: 'Education' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: 'sports', name: 'Sports' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: 'culture', name: 'Culture' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: 'entertainment', name: 'Entertainment' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: 'fashion', name: 'Fashion' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: 'travel', name: 'Travel' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: 'world', name: 'World News' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: 'crime', name: 'Crime' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: 'society', name: 'Society' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: 'lifestyle', name: 'Lifestyle' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: 'finance', name: 'Finance' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: 'automotive', name: 'Automotive' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: 'environment', name: 'Environment' },
];

const INITIAL_VALUES_SOURCE: NewsCategoriesEntityDTO[] = [
  { type: NEWS_CATEGORIES_TYPES.SOURCE, key: 'all', name: 'All' },
  { type: NEWS_CATEGORIES_TYPES.SOURCE, key: 'cnn', name: 'CNN' },
  { type: NEWS_CATEGORIES_TYPES.SOURCE, key: 'bbc', name: 'BBC' },
  { type: NEWS_CATEGORIES_TYPES.SOURCE, key: 'nyt', name: 'New York Times' },
  { type: NEWS_CATEGORIES_TYPES.SOURCE, key: 'twsj', name: 'The Wall Street Journal' },
];

const INITIAL_VALUES: NewsCategoriesEntityDTO[] = [
  INITIAL_VALUES_LOCATION,
  INITIAL_VALUES_TOPICS,
  INITIAL_VALUES_SOURCE,
].flat();

export class InsertInitialCategories1716583258194 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into(NewsCategoriesRepositoryEntity)
      .values(INITIAL_VALUES)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const queryBuilder = queryRunner.manager
      .createQueryBuilder()
      .delete()
      .from(NewsCategoriesRepositoryEntity);

    INITIAL_VALUES.forEach((value, index) => {
      if (index === 0) queryBuilder.where({ type: value.type, key: value.key });
      else queryBuilder.orWhere({ type: value.type, key: value.key });
    });

    await queryBuilder.execute();
  }
}
