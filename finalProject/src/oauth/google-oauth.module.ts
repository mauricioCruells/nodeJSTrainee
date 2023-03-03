import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from '../users/repositories/user.repository';
import { UsersModule } from 'src/users/users.module';
import { JwtAuthService } from '../jwt-auth/services/jwt-auth.service';
import { JwtAuthModule } from '../jwt-auth/jwt-auth.module';
import { GoogleOauthController } from './controllers/google-oauth.controller';
import { GoogleOauthStrategy } from './strategies/google-oauth.strategy';
import { RoleRepository } from 'src/roles/repositories/role.repository';

@Module({
  imports: [UsersModule, JwtAuthModule, HttpModule, PassportModule],
  controllers: [GoogleOauthController],
  providers: [
    JwtAuthService,
    GoogleOauthStrategy,
    UserRepository,
    RoleRepository,
  ],
})
export class GoogleOauthModule {}
