import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import NewsUser from '../users/entities/news_user.entity';
import Account from '../auth/entities/account.entity';
import Article from '../news/entities/article.entity';
import { getEnvPath } from '../common/helper/env.helper';

const envFilePath: string = getEnvPath(`${__dirname}/../common/envs`);

config({ path: envFilePath });

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASS'),
  database: configService.get('DB_DB'),
  entities: [NewsUser, Account, Article],
  migrations: [`${__dirname}/migrations/*.ts`],
});
