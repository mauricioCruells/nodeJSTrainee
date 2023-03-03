import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '../interfaces/role.enum';

export class RoleParamDto {
  @IsEnum({ type: Role })
  @IsNotEmpty()
  public newRole: Role;
}
