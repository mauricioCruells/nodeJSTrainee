import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Account from './entities/account.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import NewsUser from 'src/users/entities/news_user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsUser, Account]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
