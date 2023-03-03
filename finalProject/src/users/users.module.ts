import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserRepository } from './repositories/user.repository';
import { RolesModule } from '../roles/roles.module';
import { TicketsModule } from 'src/tickets/tickets.module';
import { JwtAuthModule } from '../jwt-auth/jwt-auth.module';

@Module({
  imports: [
    forwardRef(() => JwtAuthModule),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RolesModule,
    TicketsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService, UserRepository, MongooseModule],
})
export class UsersModule {}
