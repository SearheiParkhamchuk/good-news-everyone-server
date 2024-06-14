import {
  NEWS_CATEGORIES_KEYS_LOCATION,
  NEWS_CATEGORIES_KEYS_SOURCE,
  NEWS_CATEGORIES_KEYS_TOPIC,
  NEWS_CATEGORIES_TYPES,
} from '@/src/04-entities/news-categories-repository/@enum';
import { NewsCategoriesRepositoryEntity } from '@/src/04-entities/news-categories-repository/news-categories-repository.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

const INITIAL_VALUES_LOCATION = [
  { type: NEWS_CATEGORIES_TYPES.LOCATION, key: NEWS_CATEGORIES_KEYS_LOCATION.World, name: 'World' },
  { type: NEWS_CATEGORIES_TYPES.LOCATION, key: NEWS_CATEGORIES_KEYS_LOCATION.Europe, name: 'Europe' },
  { type: NEWS_CATEGORIES_TYPES.LOCATION, key: NEWS_CATEGORIES_KEYS_LOCATION.Africa, name: 'Africa' },
  { type: NEWS_CATEGORIES_TYPES.LOCATION, key: NEWS_CATEGORIES_KEYS_LOCATION.Australia, name: 'Australia' },
  { type: NEWS_CATEGORIES_TYPES.LOCATION, key: NEWS_CATEGORIES_KEYS_LOCATION.Asia, name: 'Asia' },
  {
    type: NEWS_CATEGORIES_TYPES.LOCATION,
    key: NEWS_CATEGORIES_KEYS_LOCATION.MiddleEast,
    name: 'Middle East',
  },
  {
    type: NEWS_CATEGORIES_TYPES.LOCATION,
    key: NEWS_CATEGORIES_KEYS_LOCATION.NorthAmerica,
    name: 'North America',
  },
  {
    type: NEWS_CATEGORIES_TYPES.LOCATION,
    key: NEWS_CATEGORIES_KEYS_LOCATION.SouthAmerica,
    name: 'South America',
  },
  {
    type: NEWS_CATEGORIES_TYPES.LOCATION,
    key: NEWS_CATEGORIES_KEYS_LOCATION.GreatBritain,
    name: 'Great Britain',
  },
] as const;

const INITIAL_VALUES_TOPICS = [
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Any, name: 'Any' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Politics, name: 'Politics' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Economy, name: 'Economy' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Technology, name: 'Technology' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Science, name: 'Science' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Health, name: 'Health' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Education, name: 'Education' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Sports, name: 'Sports' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Culture, name: 'Culture' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Entertainment, name: 'Entertainment' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Fashion, name: 'Fashion' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Travel, name: 'Travel' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Crime, name: 'Crime' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Society, name: 'Society' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Lifestyle, name: 'Lifestyle' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Finance, name: 'Finance' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Automotive, name: 'Automotive' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Environment, name: 'Environment' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Popular, name: 'Popular' },
  { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.RealEstate, name: 'Real Estate' },
] as const;

const INITIAL_VALUES_SOURCE = [
  { type: NEWS_CATEGORIES_TYPES.SOURCE, key: NEWS_CATEGORIES_KEYS_SOURCE.CNN, name: 'CNN' },
  { type: NEWS_CATEGORIES_TYPES.SOURCE, key: NEWS_CATEGORIES_KEYS_SOURCE.BBC, name: 'BBC' },
  { type: NEWS_CATEGORIES_TYPES.SOURCE, key: NEWS_CATEGORIES_KEYS_SOURCE.NYT, name: 'New York Times' },
  {
    type: NEWS_CATEGORIES_TYPES.SOURCE,
    key: NEWS_CATEGORIES_KEYS_SOURCE.TheWallStreetJournal,
    name: 'The Wall Street Journal',
  },
] as const;

const INITIAL_VALUES = [INITIAL_VALUES_LOCATION, INITIAL_VALUES_TOPICS, INITIAL_VALUES_SOURCE].flat();

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
