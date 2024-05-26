import { type PREFIXED_ATTRIBUTES } from '../../model/@enums/prefixed-xml-attributes';

export type RawDataSource = {
  '?xml': {
    [PREFIXED_ATTRIBUTES.VERSION]: string;
  };
  rss: {
    [PREFIXED_ATTRIBUTES.VERSION]: string;
    channel: {
      copyright: string;
      description: string;
      item: Array<{
        [PREFIXED_ATTRIBUTES.XMLNS_MEDIA]: string;
        [PREFIXED_ATTRIBUTES.XMLNS_STR]: string;
        description: string;
        guid: {
          '#text': string;
        };
        link: string;
        pubDate: string;
        title: string;
        'media:group'?: {
          'media:content': Array<{
            [PREFIXED_ATTRIBUTES.HEIGHT]: string;
            [PREFIXED_ATTRIBUTES.MEDIUM]: string;
            [PREFIXED_ATTRIBUTES.TYPE]: string;
            [PREFIXED_ATTRIBUTES.URL]: string;
            [PREFIXED_ATTRIBUTES.WIDTH]: string;
          }>;
        };
        'media:thumbnail'?: {
          [PREFIXED_ATTRIBUTES.HEIGHT]: string;
          [PREFIXED_ATTRIBUTES.URL]: string;
          [PREFIXED_ATTRIBUTES.WIDTH]: string;
        };
      }>;
      language: string;
      link: string;
      pubDate: string;
      title: string;
      ttl: number;
    };
  };
};
