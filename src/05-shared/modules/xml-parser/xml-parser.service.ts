import { Injectable } from '@nestjs/common';
import { XMLParser as FastXmlParser } from 'fast-xml-parser';

@Injectable()
export class XmlParser {
  private readonly parser: FastXmlParser;

  constructor() {
    this.parser = new FastXmlParser({ ignoreAttributes: false });
  }

  parse(xmlData: string | Buffer) {
    return this.parser.parse(xmlData);
  }
}
