import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './common/helper/env.helper';
import { validate } from './validation/env.validation';
import { NewsModule } from './news/news.module';
import { NewsGrabberModule } from './news-grabber/news-grabber.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      validate,
      isGlobal: true,
    }),
    NewsModule,
    NewsGrabberModule,
  ],
  controllers: [],
})
export class AppModule {}
