import { forwardRef, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthenticationController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthStrategy } from './strategies/jwt-auth.strategy';
import { JwtConfigService } from './services/jwt-config.service';
import { UserRepository } from '../users/repositories/user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './schemas/token.schema';
import { tokenRepository } from './repositories/token.repository';
import { UsersModule } from 'src/users/users.module';
import { RoleRepository } from 'src/roles/repositories/role.repository';
import { Role, RoleSchema } from 'src/roles/schemas/role.schema';
import { JwtAuthService } from './services/jwt-auth.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    HttpModule,
    PassportModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    JwtAuthService,
    JwtAuthStrategy,
    UserRepository,
    tokenRepository,
    RoleRepository,
  ],
  exports: [JwtAuthService, JwtModule, MongooseModule],
})
export class JwtAuthModule {}
