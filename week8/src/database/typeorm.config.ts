import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { getEnvPath } from '../common';

const envFilePath: string = getEnvPath(`${__dirname}/../../`);

config({ path: envFilePath });

const configService = new ConfigService();
const options: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASS'),
  database: configService.get('DB_NAME'),
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  migrations: [`${__dirname}/migrations/*.ts`],
};
export default new DataSource(options);
