import { Module } from '@nestjs/common';
import { NewsGrabberModule } from 'src/news-grabber/news-grabber.module';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [NewsGrabberModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
