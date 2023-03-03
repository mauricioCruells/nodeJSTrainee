import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getEnvPath, validate } from './common';
import { DBConfigService, DBModule } from './database';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';
import { InitService } from './init.service';
import { MailModule } from './mail/mail.module';

const envFilePath = getEnvPath(__dirname);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      validate,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [DBModule],
      useExisting: DBConfigService,
    }),
    UsersModule,
    MoviesModule,
    AuthModule,
    MailModule,
  ],
  providers: [InitService],
})
export class AppModule {}
