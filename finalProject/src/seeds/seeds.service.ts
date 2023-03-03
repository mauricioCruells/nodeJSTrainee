import { Injectable, OnModuleInit } from '@nestjs/common';
import { RoleRepository } from 'src/roles/repositories/role.repository';
import { SuperAdmin } from './constants/super_admin.constant';
import { Roles } from './constants/roles.constants';
import { UsersService } from 'src/users/services/users.service';
@Injectable()
export class SeedsService implements OnModuleInit {
  constructor(
    private readonly userService: UsersService,
    private readonly roleRepository: RoleRepository,
  ) {}

  async onModuleInit() {
    await this.roleRepository.seedRoles(Roles);

    const superAdminRole = await this.roleRepository.findOne({
      name: 'super admin',
    });

    const superAdmin = await this.userService.findOne({
      role: superAdminRole,
    });

    if (!superAdmin) {
      const role = await this.roleRepository.findOne({ name: 'super admin' });
      const user = {
        ...SuperAdmin,
        role: role,
        createdAt: new Date(),
        tickets: [],
      };

      return this.userService.create(user);
    }
  }
}
