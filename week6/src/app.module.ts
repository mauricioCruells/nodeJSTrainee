import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './common/helper/env.helper';
import { validate } from './common/validation/env.validation';
import { NewsModule } from './news/news.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBModule } from './db/db.module';
import { DBConfigService } from './db/db-config.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      validate,
      isGlobal: true,
    }),
    NewsModule,
    TypeOrmModule.forRootAsync({
      imports: [DBModule],
      useExisting: DBConfigService,
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
