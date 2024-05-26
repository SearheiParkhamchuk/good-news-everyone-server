import { XmlParser } from '@/src/05-shared/modules/xml-parser';
import { type ArticleRemoteSource } from '../@types';

export type SourceOptions<M extends object = Record<string, never>> = { url: string; metadata: M };

export type SourceResponse<D, M extends object> =
  | {
      data: null;
      error: Error;
      metadata?: M;
    }
  | {
      data: D;
      error: null;
      metadata?: M;
    };

export abstract class NewsSource<D = any, M extends object = Record<string, never>> {
  data: { data: D | undefined; metadata?: M };
  error: Error | undefined;

  abstract source: string;
  constructor(
    readonly options: SourceOptions<M>,
    readonly parser: XmlParser,
  ) {}

  abstract adapter(): SourceResponse<ArticleRemoteSource[], M>;

  async getAll(): Promise<this> {
    const rawData = await fetch(this.options.url);
    if (rawData.status >= 400) {
      this.error = new Error(rawData.statusText);
    } else {
      const buffer = Buffer.from(await rawData.arrayBuffer());
      this.data = { data: this.parser.parse(buffer), metadata: this.options.metadata };
    }

    return this;
  }
}
