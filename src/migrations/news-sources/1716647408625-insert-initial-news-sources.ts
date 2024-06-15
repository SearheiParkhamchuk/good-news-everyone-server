import { ArticleRepositoryEntity } from '@/src/04-entities/articles-repository/articles-repository.entity';
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
const LocationAsia = { type: NEWS_CATEGORIES_TYPES.LOCATION, key: NEWS_CATEGORIES_KEYS_LOCATION.Asia };
const LocationWorld = { type: NEWS_CATEGORIES_TYPES.LOCATION, key: NEWS_CATEGORIES_KEYS_LOCATION.World };
const LocationMiddleEast = {
  type: NEWS_CATEGORIES_TYPES.LOCATION,
  key: NEWS_CATEGORIES_KEYS_LOCATION.MiddleEast,
};
const LocationGreatBritain = {
  type: NEWS_CATEGORIES_TYPES.LOCATION,
  key: NEWS_CATEGORIES_KEYS_LOCATION.GreatBritain,
};

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
const TopicAny = { type: NEWS_CATEGORIES_TYPES.TOPIC, key: NEWS_CATEGORIES_KEYS_TOPIC.Any };

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
    categories: [LocationWorld, TopicAny, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
  {
    title: 'BBC UK',
    url: 'https://feeds.bbci.co.uk/news/uk/rss.xml',
    categories: [LocationWorld, LocationEurope, TopicAny, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
  {
    title: 'BBC Popular',
    url: 'https://feeds.bbci.co.uk/news/rss.xml',
    categories: [LocationWorld, TopicAny, TopicPopular, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
  {
    title: 'BBC Politics',
    url: 'https://feeds.bbci.co.uk/news/politics/rss.xml',
    categories: [LocationWorld, TopicAny, TopicPolitics, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
  {
    title: 'BBC Business',
    url: 'https://feeds.bbci.co.uk/news/business/rss.xml',
    categories: [LocationWorld, TopicAny, TopicFinance, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
  {
    title: 'BBC Health',
    url: 'https://feeds.bbci.co.uk/news/health/rss.xml',
    categories: [LocationWorld, TopicAny, TopicHealth, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
  {
    title: 'BBC Education & Family',
    url: 'https://feeds.bbci.co.uk/news/education/rss.xml',
    categories: [LocationWorld, TopicAny, TopicEducation, TopicLifestyle, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
  {
    title: 'BBC Science & Environment',
    url: 'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml',
    categories: [LocationWorld, TopicAny, TopicEnvironment, TopicScience, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
  {
    title: 'BBC Technology',
    url: 'https://feeds.bbci.co.uk/news/technology/rss.xml',
    categories: [LocationWorld, TopicAny, TopicTechnology, TopicScience, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
  {
    title: 'BBC Entertainment & Arts',
    url: 'https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml',
    categories: [LocationWorld, TopicAny, TopicEntertainment, TopicCulture, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
  {
    title: 'BBC News - Africa',
    url: 'https://feeds.bbci.co.uk/news/world/africa/rss.xml',
    categories: [LocationWorld, LocationAfrica, TopicAny, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
  {
    title: 'BBC News - Asia',
    url: 'https://feeds.bbci.co.uk/news/world/asia/rss.xml',
    categories: [LocationWorld, LocationAsia, TopicAny, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
  {
    title: 'BBC News - Europe',
    url: 'https://feeds.bbci.co.uk/news/world/europe/rss.xml',
    categories: [LocationWorld, LocationEurope, TopicAny, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
  {
    title: 'BBC News - Latin America',
    url: 'https://feeds.bbci.co.uk/news/world/latin_america/rss.xml',
    categories: [LocationWorld, LocationSouthAmerica, TopicAny, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
  {
    title: 'BBC News - Middle East',
    url: 'https://feeds.bbci.co.uk/news/world/middle_east/rss.xml',
    categories: [LocationWorld, LocationMiddleEast, TopicAny, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
  {
    title: 'BBC News - US & Canada',
    url: 'https://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml',
    categories: [LocationWorld, LocationNorthAmerica, TopicAny, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
  {
    title: 'BBC News - England',
    url: 'https://feeds.bbci.co.uk/news/england/rss.xml',
    categories: [LocationWorld, LocationGreatBritain, TopicAny, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
  {
    title: 'BBC News - Northern Ireland',
    url: 'https://feeds.bbci.co.uk/news/northern_ireland/rss.xml',
    categories: [LocationWorld, LocationGreatBritain, TopicAny, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
  {
    title: 'BBC News - Scotland',
    url: 'https://feeds.bbci.co.uk/news/scotland/rss.xml',
    categories: [LocationWorld, LocationGreatBritain, TopicAny, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
  {
    title: 'BBC News - Wales',
    url: 'https://feeds.bbci.co.uk/news/wales/rss.xml',
    categories: [LocationWorld, LocationGreatBritain, TopicAny, SourceBBC],
    source: NEWS_REPOSITORY_SOURCES.BBC,
  },
];

const CNN_SOURCE_OPTIONS: Source[] = [
  {
    title: 'CNN Most Popular',
    url: 'http://rss.cnn.com/rss/cnn_latest.rss',
    categories: [LocationWorld, TopicAny, TopicPopular, SourceCNN],
    source: NEWS_REPOSITORY_SOURCES.CNN,
  },
  {
    title: 'CNN Money Top Stories',
    url: 'http://rss.cnn.com/rss/money_topstories.rss',
    categories: [LocationWorld, TopicAny, TopicPopular, TopicFinance, SourceCNN],
    source: NEWS_REPOSITORY_SOURCES.CNN,
  },
  {
    title: 'CNN Money Most Popular',
    url: 'http://rss.cnn.com/rss/money_mostpopular.rss',
    categories: [LocationWorld, TopicAny, TopicPopular, TopicFinance, SourceCNN],
    source: NEWS_REPOSITORY_SOURCES.CNN,
  },
  {
    title: 'CNN Money Companies',
    url: 'http://rss.cnn.com/rss/money_news_companies.rss',
    categories: [LocationWorld, TopicAny, TopicFinance, SourceCNN],
    source: NEWS_REPOSITORY_SOURCES.CNN,
  },
  {
    title: 'CNN Money International',
    url: 'http://rss.cnn.com/rss/money_news_international.rss',
    categories: [LocationWorld, TopicAny, TopicFinance, SourceCNN],
    source: NEWS_REPOSITORY_SOURCES.CNN,
  },
  {
    title: 'CNN Money Economy',
    url: 'http://rss.cnn.com/rss/money_news_economy.rss',
    categories: [LocationWorld, TopicAny, TopicEconomy, TopicFinance, SourceCNN],
    source: NEWS_REPOSITORY_SOURCES.CNN,
  },
  {
    title: 'CNN Money Media',
    url: 'http://rss.cnn.com/rss/money_media.rss',
    categories: [LocationWorld, TopicAny, TopicSociety, TopicFinance, SourceCNN],
    source: NEWS_REPOSITORY_SOURCES.CNN,
  },
  {
    title: 'CNN Money Technology',
    url: 'http://rss.cnn.com/rss/money_technology.rss',
    categories: [LocationWorld, TopicAny, TopicTechnology, TopicFinance, SourceCNN],
    source: NEWS_REPOSITORY_SOURCES.CNN,
  },
  {
    title: 'CNN Money Lifestyle',
    url: 'http://rss.cnn.com/rss/money_lifestyle.rss',
    categories: [LocationWorld, TopicAny, TopicLifestyle, TopicFinance, SourceCNN],
    source: NEWS_REPOSITORY_SOURCES.CNN,
  },
  {
    title: 'CNN Money Real Estate',
    url: 'http://rss.cnn.com/rss/money_realestate.rss',
    categories: [LocationWorld, TopicAny, TopicRealEstate, TopicFinance, SourceCNN],
    source: NEWS_REPOSITORY_SOURCES.CNN,
  },
  {
    title: 'CNN Money Luxury',
    url: 'http://rss.cnn.com/rss/money_luxury.rss',
    categories: [LocationWorld, TopicAny, TopicFinance, SourceCNN],
    source: NEWS_REPOSITORY_SOURCES.CNN,
  },
];

const NYT_SOURCE_OPTIONS: Source[] = [
  {
    title: 'New York Times World',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml',
    categories: [LocationWorld, TopicAny, SourceNYT],
    source: NEWS_REPOSITORY_SOURCES.NYT,
  },
  {
    title: 'New York Times Europe',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/Europe.xml',
    categories: [LocationWorld, LocationEurope, TopicAny, SourceNYT],
    source: NEWS_REPOSITORY_SOURCES.NYT,
  },
  {
    title: 'New York Times Americans',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/Americas.xml',
    categories: [LocationWorld, LocationNorthAmerica, LocationSouthAmerica, TopicAny, SourceNYT],
    source: NEWS_REPOSITORY_SOURCES.NYT,
  },
  {
    title: 'New York Times Africa',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/Africa.xml',
    categories: [LocationWorld, LocationAfrica, TopicAny, SourceNYT],
    source: NEWS_REPOSITORY_SOURCES.NYT,
  },
];

const WSJ_SOURCE_OPTIONS = [
  {
    title: 'The Wall Stree Journal World',
    url: 'https://feeds.a.dj.com/rss/RSSWorldNews.xml',
    categories: [LocationWorld, TopicAny, SourceWSJ],
    source: NEWS_REPOSITORY_SOURCES.WALL_STREET_JOURNAL,
  },
  {
    title: 'The Wall Stree Journal Business',
    url: 'https://feeds.a.dj.com/rss/WSJcomUSBusiness.xml',
    categories: [LocationWorld, TopicAny, TopicFinance, TopicEconomy, TopicRealEstate, SourceWSJ],
    source: NEWS_REPOSITORY_SOURCES.WALL_STREET_JOURNAL,
  },
  {
    title: 'The Wall Stree Journal Lifestyle',
    url: 'https://feeds.a.dj.com/rss/RSSLifestyle.xml',
    categories: [LocationWorld, TopicAny, TopicLifestyle, SourceWSJ],
    source: NEWS_REPOSITORY_SOURCES.WALL_STREET_JOURNAL,
  },
  {
    title: 'The Wall Stree Journal Technology',
    url: 'https://feeds.a.dj.com/rss/RSSWSJD.xml',
    categories: [LocationWorld, TopicAny, TopicTechnology, TopicScience, SourceWSJ],
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
        const categories = await newsCategoriesRepository.findBy(source.categories);
        const news_source = new NewsSourcesRepositoryEntity();
        news_source.url = source.url;
        news_source.title = source.title;
        news_source.categories = categories;
        news_source.source = source.source;
        return news_source;
      });

      const entities = await Promise.all(promises);
      await queryRunner.manager.save(entities);
      await queryRunner.commitTransaction();
    } catch {
      await queryRunner.rollbackTransaction();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const newsSourcesRepository = queryRunner.manager.getRepository(NewsSourcesRepositoryEntity);
    const articleRepository = queryRunner.manager.getRepository(ArticleRepositoryEntity);

    const urls = SOURCES.map((s) => s.url);
    const sources = await newsSourcesRepository.find({ where: { url: In(urls) } });
    const articles = await articleRepository.findBy({ source: In(sources.map((s) => s.uuid)) });

    try {
      await queryRunner.startTransaction();
      await articleRepository.remove(articles);
      await newsSourcesRepository.remove(sources);
      await queryRunner.commitTransaction();
    } catch {
      await queryRunner.rollbackTransaction();
    }
  }
}
