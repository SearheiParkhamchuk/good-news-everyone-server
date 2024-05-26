import { Module } from '@nestjs/common';
import { NewsSourcesReceiverService } from './news-sources-receiver.service';
import { XmlParserModule } from '@/src/05-shared/modules/xml-parser/xml-parser.module';
import { NewsSourcesEntitiesFactory } from './news-sources-entities.factory';

@Module({
  controllers: [],
  providers: [NewsSourcesReceiverService, NewsSourcesEntitiesFactory],
  exports: [NewsSourcesReceiverService],
  imports: [XmlParserModule],
})
export class NewsSourcesReceiverModule {}
