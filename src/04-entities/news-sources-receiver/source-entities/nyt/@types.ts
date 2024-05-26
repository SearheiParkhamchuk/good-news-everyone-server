import { PREFIXED_ATTRIBUTES } from '../../model/@enums/prefixed-xml-attributes';

export type RawDataSource = {
  '?xml': {
    [PREFIXED_ATTRIBUTES.ENCODING]: string;
    [PREFIXED_ATTRIBUTES.VERSION]: string;
  };
  rss: {
    [PREFIXED_ATTRIBUTES.VERSION]: string;
    [PREFIXED_ATTRIBUTES.XMLNS_ATOM]: string;
    [PREFIXED_ATTRIBUTES.XMLNS_DC]: string;
    [PREFIXED_ATTRIBUTES.XMLNS_MEDIA]: string;
    [PREFIXED_ATTRIBUTES.XMLNS_NYT]: string;
    channel: {
      'atom:link': {
        [PREFIXED_ATTRIBUTES.HREF]: string;
        [PREFIXED_ATTRIBUTES.REL]: string;
        [PREFIXED_ATTRIBUTES.TYPE]: string;
      };
      copyright: string;
      description: string;
      image: {
        link: string;
        title: string;
        url: string;
      };
      item: Array<{
        'atom:link': { [PREFIXED_ATTRIBUTES.HREF]: string; [PREFIXED_ATTRIBUTES.REL]: string };
        'dc:creator': string;
        description: string;
        guid: { [PREFIXED_ATTRIBUTES.IS_PERMA_LINK]: 'true' | 'false'; '#text': string };
        link: string;
        pubDate: string;
        title: string;
        category?: Array<{
          [PREFIXED_ATTRIBUTES.DOMAIN]: string;
          '#text': string;
        }>;
        'media:content'?: {
          [PREFIXED_ATTRIBUTES.HEIGHT]: string;
          [PREFIXED_ATTRIBUTES.URL]: string;
          [PREFIXED_ATTRIBUTES.WIDTH]: string;
          [PREFIXED_ATTRIBUTES.MEDIUM]: string;
        };
        'media:credit'?: string;
        'media:description'?: string;
      }>;
      language: string;
      lastBuildDate: string;
      link: string;
      pubDate: string;
      title: string;
    };
  };
};
