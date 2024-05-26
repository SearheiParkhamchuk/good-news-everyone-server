import { type PREFIXED_ATTRIBUTES } from '../../model/@enums/prefixed-xml-attributes';

export type RawDataSource = {
  '?xml': {
    [PREFIXED_ATTRIBUTES.ENCODING]: string;
    [PREFIXED_ATTRIBUTES.VERSION]: string;
  };
  rss: {
    [PREFIXED_ATTRIBUTES.VERSION]: string;
    [PREFIXED_ATTRIBUTES.XMLNS_WSJ]: string;
    [PREFIXED_ATTRIBUTES.XMLNS_DJ]: string;
    [PREFIXED_ATTRIBUTES.XMLNS_ATOM]: string;
    [PREFIXED_ATTRIBUTES.XMLNS_CONTENT]: string;
    channel: {
      'atom:link': {
        [PREFIXED_ATTRIBUTES.HREF]: string;
        [PREFIXED_ATTRIBUTES.REL]: string;
        [PREFIXED_ATTRIBUTES.TYPE]: string;
      };
      copyright: string;
      description: string;
      docs: string;
      generator: string;
      image: {
        link: string;
        title: string;
        url: string;
      };
      item: Array<{
        category: {
          [PREFIXED_ATTRIBUTES.DOMAIN]: string;
          '#text': string;
        };
        'content:encoded': string;
        description: string;
        guid: { '#text': string };
        link: string;
        pubDate: string;
        title: string;
        'wsj:articletype': string;
      }>;
      language: string;
      lastBuildDate: string;
      link: string;
      pubDate: string;
      title: string;
    };
  };
};
