import { type PREFIXED_ATTRIBUTES } from '../../model/@enums/prefixed-xml-attributes';

export type RawDataSource = {
  '?xml': {
    [PREFIXED_ATTRIBUTES.ENCODING]: string;
    [PREFIXED_ATTRIBUTES.VERSION]: string;
  };
  rss: {
    [PREFIXED_ATTRIBUTES.VERSION]: string;
    [PREFIXED_ATTRIBUTES.XMLNS_ATOM]: string;
    [PREFIXED_ATTRIBUTES.XMLNS_CONTENT]: string;
    [PREFIXED_ATTRIBUTES.XMLNS_DC]: string;
    [PREFIXED_ATTRIBUTES.XMLNS_MEDIA]: string;
    channel: {
      'atom:link': {
        [PREFIXED_ATTRIBUTES.HREF]: string;
        [PREFIXED_ATTRIBUTES.REL]: string;
        [PREFIXED_ATTRIBUTES.TYPE]: string;
      };
      copyright: string;
      description: string;
      generator: string;
      image: {
        link: string;
        title: string;
        url: string;
      };
      item: Array<{
        description: string;
        guid: { '#text': string };
        link: string;
        pubDate: string;
        title: string;
        'media:thumbnail'?: {
          [PREFIXED_ATTRIBUTES.HEIGHT]: number;
          [PREFIXED_ATTRIBUTES.URL]: string;
          [PREFIXED_ATTRIBUTES.WIDTH]: number;
        };
      }>;
      language: string;
      lastBuildDate: string;
      link: string;
      title: string;
      ttl: number;
    };
  };
};
