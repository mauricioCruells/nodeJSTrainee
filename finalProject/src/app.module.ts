import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TicketsModule } from './tickets/tickets.module';
import { RolesModule } from './roles/roles.module';
import { ProjectsModule } from './projects/projects.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedsModule } from './seeds/seeds.module';
import { GoogleOauthModule } from './oauth/google-oauth.module';
import { JwtAuthModule } from './jwt-auth/jwt-auth.module';

// The ConfigModule.forRoot() method is used to register the configuration module with the application.
// The isGlobal option is used to make the configuration module global, so that it can be used in any module.
// I recommend using ConfigModule.forRoot() on the modules that need to use the configuration service.
// We should delete the isGlobal option and import the ConfigModule in the modules that need to use the configuration service.

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    TicketsModule,
    RolesModule,
    ProjectsModule,
    SeedsModule,
    JwtAuthModule,
    GoogleOauthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
