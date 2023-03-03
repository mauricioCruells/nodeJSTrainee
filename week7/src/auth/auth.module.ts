import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Account from './entities/account.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import NewsUser from 'src/users/entities/news_user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { NewsUserRepository } from 'src/users/repositories/news-user.repository';
import { AccountRepository } from './repositories/account.repository';
import { AccountFacade } from './facades/account.facade';
import { JwtValidator } from './utils/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsUser, Account]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    NewsUserRepository,
    AccountRepository,
    AccountFacade,
    JwtValidator,
  ],
})
export class AuthModule {}
