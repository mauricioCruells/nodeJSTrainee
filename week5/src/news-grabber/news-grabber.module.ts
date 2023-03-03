import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NewsGrabberService } from './news-grabber.service';
import { NewsFormatterService } from './news-formatter.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
    }),
  ],
  providers: [NewsGrabberService, NewsFormatterService],
  exports: [NewsGrabberService],
})
export class NewsGrabberModule {}
