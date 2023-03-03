import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Role, RoleDocument } from '../schemas/role.schema';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
  ) {}

  async seedRoles(roles: string[]): Promise<void> {
    const savedRoles = (
      await this.roleModel.find({ name: { $in: roles } })
    ).map((role) => role.name);
    if (!roles.every((role) => savedRoles.includes(role))) {
      await this.roleModel.insertMany(roles.map((role) => ({ name: role })));
    }
  }

  async findOne(roleFilterQuery: FilterQuery<Role>): Promise<Role> {
    return this.roleModel.findOne(roleFilterQuery);
  }
}
