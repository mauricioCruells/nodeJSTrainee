import { Module } from '@nestjs/common';
import { DBConfigService } from './db-config.service';

@Module({
  providers: [DBConfigService],
  exports: [DBConfigService],
})
export class DBModule {}
