import { Module } from '@nestjs/common';
import { XmlParser } from './xml-parser.service';

@Module({
  controllers: [],
  providers: [XmlParser],
  exports: [XmlParser],
})
export class XmlParserModule {}
