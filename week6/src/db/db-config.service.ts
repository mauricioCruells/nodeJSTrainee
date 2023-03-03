import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm';

@Injectable()
export class DBConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    let options: TypeOrmModuleOptions = {};

    if (this.configService.get('DB_TYPE') === 'postgres') {
      options = this.postgresOptions();
    }

    return options;
  }

  private postgresOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT'),
      username: this.configService.get('DB_USER'),
      password: this.configService.get('DB_PASS'),
      database: this.configService.get('DB_DB'),
      autoLoadEntities: true,
    };
  }
}
