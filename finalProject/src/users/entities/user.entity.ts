import { Role } from '../../roles/schemas/role.schema';

export class User {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  role: Role;
}
