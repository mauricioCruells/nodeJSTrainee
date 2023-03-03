import { Module } from '@nestjs/common';
import { SeedsService } from './services/seeds.service';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';
import { RoleRepository } from 'src/roles/repositories/role.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schemas/user.schema';
import { Role, RoleSchema } from 'src/roles/schemas/role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    UsersModule,
    RolesModule,
  ],
  providers: [SeedsService, RoleRepository],
})
export class SeedsModule {}
