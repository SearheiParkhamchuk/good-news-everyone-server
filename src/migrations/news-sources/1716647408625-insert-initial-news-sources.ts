import {
  NEWS_CATEGORIES_KEYS_LOCATION,
  NEWS_CATEGORIES_KEYS_SOURCE,
  NEWS_CATEGORIES_KEYS_TOPIC,
  NEWS_CATEGORIES_TYPES,
} from '@/src/04-entities/news-categories-repository/@enum';
import { NewsCategoriesRepositoryEntity } from '@/src/04-entities/news-categories-repository/news-categories-repository.entity';
import { NEWS_REPOSITORY_SOURCES } from '@/src/04-entities/news-sources-repository/@enums';
import { NewsSourcesRepositoryEntity } from '@/src/04-entities/news-sources-repository/news-sources-repository.entity';
import { MigrationInterface, QueryRunner, In } from 'typeorm';

type Source = {
  title: string;
  url: string;
  categories: Array<{
    type: NEWS_CATEGORIES_TYPES;
    key: NEWS_CATEGORIES_KEYS_LOCATION | NEWS_CATEGORIES_KEYS_TOPIC | NEWS_CATEGORIES_KEYS_SOURCE;
  }>;
  source: NEWS_REPOSITORY_SOURCES;
};

const LocationAll = { type: NEWS_CATEGORIES_TYPES.LOCATION, key: NEWS_CATEGORIES_KEYS_LOCATION.All };
const LocationEurope = { type: NEWS_CATEGORIES_TYPES.LOCATION, key: NEWS_CATEGORIES_KEYS_LOCATION.Europe };
const LocationNorthAmerica = {
  type: NEWS_CATEGORIES_TYPES.LOCATION,
  key: NEWS_CATEGORIES_KEYS_LOCATION.NorthAmerica,
};
const LocationSouthAmerica = {
  type: NEWS_CATEGORIES_TYPES.LOCATION,
  key: NEWS_CATEGORIES_KEYS_LOCATION.SouthAmerica,
};
const LocationAfrica = { type: NEWS_CATEGORIES_TYPES.LOCATION, key: NEWS_CATEGORIES_KEYS_LOCATION.Africa };

const TopicAll = { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.All };
const TopicPopular = { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Popular };
const TopicPolitics = { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Politics };
const TopicFinance = { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Finance };
const TopicHealth = { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Health };
const TopicEducation = { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Education };
const TopicCulture = { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Culture };
const TopicEnvironment = { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Environment };
const TopicScience = { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Science };
const TopicTechnology = { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Technology };
const TopicEntertainment = {
  type: NEWS_CATEGORIES_TYPES.TOPIC,
  key: NEWS_CATEGORIES_KEYS_TOPIC.Entertainment,
};
const TopicLifestyle = { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Lifestyle };
const TopicEconomy = { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Economy };
const TopicSociety = { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Society };
const TopicRealEstate = { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.RealEstate };

const SourceBBC = { type: NEWS_CATEGORIES_TYPES.SOURCE, key: NEWS_CATEGORIES_KEYS_SOURCE.BBC };
const SourceCNN = { type: NEWS_CATEGORIES_TYPES.SOURCE, key: NEWS_CATEGORIES_KEYS_SOURCE.CNN };
const SourceNYT = { type: NEWS_CATEGORIES_TYPES.SOURCE, key: NEWS_CATEGORIES_KEYS_SOURCE.NYT };
const SourceWSJ = {
  type: NEWS_CATEGORIES_TYPES.SOURCE,
  key: NEWS_CATEGORIES_KEYS_SOURCE.TheWallStreetJournal,
};

const BBC_SOURCE_OPTIONS: Source[] = [
  {
    title: 'BBC World',
    url: 'https://feeds.bbci.co.uk/news/world/rss.xml',
    categories: [LocationAll, TopicAll, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
  {
    title: 'BBC UK',
    url: 'https://feeds.bbci.co.uk/news/uk/rss.xml',
    categories: [LocationEurope, TopicAll, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
  {
    title: 'BBC Popular',
    url: 'https://feeds.bbci.co.uk/news/rss.xml',
    categories: [LocationAll, TopicPopular, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
  {
    title: 'BBC Politics',
    url: 'https://feeds.bbci.co.uk/news/politics/rss.xml',
    categories: [LocationAll, TopicPolitics, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
  {
    title: 'BBC Business',
    url: 'https://feeds.bbci.co.uk/news/business/rss.xml',
    categories: [LocationAll, TopicFinance, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
  {
    title: 'BBC Health',
    url: 'https://feeds.bbci.co.uk/news/health/rss.xml',
    categories: [LocationAll, TopicHealth, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
  {
    title: 'BBC Education & Family',
    url: 'https://feeds.bbci.co.uk/news/education/rss.xml',
    categories: [LocationAll, TopicEducation, TopicLifestyle, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
  {
    title: 'BBC Science & Environment',
    url: 'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml',
    categories: [LocationAll, TopicEnvironment, TopicScience, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
  {
    title: 'BBC Technology',
    url: 'https://feeds.bbci.co.uk/news/technology/rss.xml',
    categories: [LocationAll, TopicTechnology, TopicScience, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
  {
    title: 'BBC Entertainment & Arts',
    url: 'https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml',
    categories: [LocationAll, TopicEntertainment, TopicCulture, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
];

const CNN_SOURCE_OPTIONS: Source[] = [
  {
    title: 'CNN Most Popular',
    url: 'http://rss.cnn.com/rss/cnn_latest.rss',
    categories: [LocationAll, TopicPopular, SourceCNN],
    source: NEWS_REPOSITORY_SOURCES.CNN,
  },
  {
    title: 'CNN Money Top Stories',
    url: 'http://rss.cnn.com/rss/money_topstories.rss',
    categories: [LocationAll, TopicPopular, TopicFinance, SourceCNN],
    source: NEWS_REPOSITORY_SOURCES.CNN,
  },
  {
    title: 'CNN Money Most Popular',
    url: 'http://rss.cnn.com/rss/money_mostpopular.rss',
    categories: [LocationAll, TopicPopular, TopicFinance, SourceCNN],
    source: NEWS_REPOSITORY_SOURCES.CNN,
  },
  {
    title: 'CNN Money Companies',
    url: 'http://rss.cnn.com/rss/money_news_companies.rss',
    categories: [LocationAll, TopicFinance, SourceCNN],
    source: NEWS_REPOSITORY_SOURCES.CNN,
  },
  {
    title: 'CNN Money International',
    url: 'http://rss.cnn.com/rss/money_news_international.rss',
    categories: [LocationAll, TopicFinance, SourceCNN],
    source: NEWS_REPOSITORY_SOURCES.CNN,
  },
  {
    title: 'CNN Money Economy',
    url: 'http://rss.cnn.com/rss/money_news_economy.rss',
    categories: [LocationAll, TopicEconomy, TopicFinance, SourceCNN],
    source: NEWS_REPOSITORY_SOURCES.CNN,
  },
  {
    title: 'CNN Money Media',
    url: 'http://rss.cnn.com/rss/money_media.rss',
    categories: [LocationAll, TopicSociety, TopicFinance, SourceCNN],
    source: NEWS_REPOSITORY_SOURCES.CNN,
  },
  {
    title: 'CNN Money Technology',
    url: 'http://rss.cnn.com/rss/money_technology.rss',
    categories: [LocationAll, TopicTechnology, TopicFinance, SourceCNN],
    source: NEWS_REPOSITORY_SOURCES.CNN,
  },
  {
    title: 'CNN Money Lifestyle',
    url: 'http://rss.cnn.com/rss/money_lifestyle.rss',
    categories: [LocationAll, TopicLifestyle, TopicFinance, SourceCNN],
    source: NEWS_REPOSITORY_SOURCES.CNN,
  },
  {
    title: 'CNN Money Real Estate',
    url: 'http://rss.cnn.com/rss/money_realestate.rss',
    categories: [LocationAll, TopicRealEstate, TopicFinance, SourceCNN],
    source: NEWS_REPOSITORY_SOURCES.CNN,
  },
  {
    title: 'CNN Money Luxury',
    url: 'http://rss.cnn.com/rss/money_luxury.rss',
    categories: [LocationAll, TopicFinance, SourceCNN],
    source: NEWS_REPOSITORY_SOURCES.CNN,
  },
];

const NYT_SOURCE_OPTIONS: Source[] = [
  {
    title: 'New York Times World',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml',
    categories: [TopicAll, LocationAll, SourceNYT],
    source: NEWS_REPOSITORY_SOURCES.NYT,
  },
  {
    title: 'New York Times Europe',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/Europe.xml',
    categories: [TopicAll, LocationEurope, SourceNYT],
    source: NEWS_REPOSITORY_SOURCES.NYT,
  },
  {
    title: 'New York Times Americans',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/Americas.xml',
    categories: [TopicAll, LocationNorthAmerica, LocationSouthAmerica, SourceNYT],
    source: NEWS_REPOSITORY_SOURCES.NYT,
  },
  {
    title: 'New York Times Africa',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/Africa.xml',
    categories: [TopicAll, LocationAfrica, SourceNYT],
    source: NEWS_REPOSITORY_SOURCES.NYT,
  },
];

const WSJ_SOURCE_OPTIONS = [
  {
    title: 'The Wall Stree Journal World',
    url: 'https://feeds.a.dj.com/rss/RSSWorldNews.xml',
    categories: [TopicAll, LocationAll, SourceWSJ],
    source: NEWS_REPOSITORY_SOURCES.WALL_STREET_JOURNAL,
  },
  {
    title: 'The Wall Stree Journal Business',
    url: 'https://feeds.a.dj.com/rss/WSJcomUSBusiness.xml',
    categories: [LocationAll, TopicFinance, TopicEconomy, TopicRealEstate, SourceWSJ],
    source: NEWS_REPOSITORY_SOURCES.WALL_STREET_JOURNAL,
  },
  {
    title: 'The Wall Stree Journal Lifestyle',
    url: 'https://feeds.a.dj.com/rss/RSSLifestyle.xml',
    categories: [LocationAll, TopicLifestyle, SourceWSJ],
    source: NEWS_REPOSITORY_SOURCES.WALL_STREET_JOURNAL,
  },
  {
    title: 'The Wall Stree Journal Technology',
    url: 'https://feeds.a.dj.com/rss/RSSWSJD.xml',
    categories: [LocationAll, TopicTechnology, TopicScience, SourceWSJ],
    source: NEWS_REPOSITORY_SOURCES.WALL_STREET_JOURNAL,
  },
];

const SOURCES = [BBC_SOURCE_OPTIONS, CNN_SOURCE_OPTIONS, NYT_SOURCE_OPTIONS, WSJ_SOURCE_OPTIONS].flat();

export class InsertInitialNewsSources1716647408625 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const newsCategoriesRepository = queryRunner.manager.getRepository(NewsCategoriesRepositoryEntity);

    try {
      await queryRunner.startTransaction();

      const promises = SOURCES.map(async (source) => {
        const categories = await Promise.all(
          source.categories.map((c) => newsCategoriesRepository.findOneBy(c)),
        );
        const news_source = new NewsSourcesRepositoryEntity();
        news_source.url = source.url;
        news_source.title = source.title;
        news_source.categories = categories;
        news_source.source = source.source;
        await news_source.save();
      });

      await Promise.all(promises);
      await queryRunner.commitTransaction();
    } catch {
      await queryRunner.rollbackTransaction();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const newsSourcesRepository = queryRunner.manager.getRepository(NewsSourcesRepositoryEntity);
    const urls = SOURCES.map((s) => s.url);
    const entities = await newsSourcesRepository.find({ where: { url: In(urls) } });

    try {
      await queryRunner.startTransaction();
      await Promise.all(entities.map((e) => e.remove()));
      await queryRunner.commitTransaction();
    } catch {
      await queryRunner.rollbackTransaction();
    }
  }
}
