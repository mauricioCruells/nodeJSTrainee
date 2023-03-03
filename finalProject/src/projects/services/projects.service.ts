import { BadRequestException, Injectable } from '@nestjs/common';
import { RoleRepository } from '../../roles/repositories/role.repository';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { User } from '../../users/schemas/user.schema';
import { UsersService } from 'src/users/services/users.service';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { ProjectAdmin } from '../constants/project_admin.constant';
import { ProjectRepository } from '../repositories/project.repository';
import { CreateTicketDto } from '../../tickets/dtos/create-ticket.dto';
import { TicketService } from '../../tickets/services/tickets.service';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly roleRepository: RoleRepository,
    private readonly userService: UsersService,
    private readonly ticketService: TicketService,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const role = await this.roleRepository.findOne({ name: 'project admin' });
    const users = [];
    let user: User = {
      ...ProjectAdmin,
      role: role,
      createdAt: new Date(),
      tickets: [],
    };

    user = await this.userService.create(user);

    users.push(user);

    createProjectDto = {
      ...createProjectDto,
      users: users,
    };

    return this.projectRepository.createProject(createProjectDto);
  }

  async addUserToProject(projectName: string, newUserInfo: CreateUserDto) {
    const project = await this.projectRepository.findOne({ name: projectName });
    const user = await this.userService.create(newUserInfo);

    project.users.push(user);

    return this.projectRepository.findOneAndUpdate(
      { projectName },
      { users: project.users },
    );
  }

  async changeUserRole(projectName: string, userId: string, role: string) {
    if (role === 'super admin') {
      throw BadRequestException;
    }
    const project = await this.projectRepository.findOne({ projectName });
    const user = await this.userService.findOne({ userId: userId });
    if (!user || !project || !role || user.role.name === 'super admin') {
      throw BadRequestException;
    }
    const newRole = await this.roleRepository.findOne({ name: role });
    const index = project.users.indexOf(user);

    return (project.users[index].role = newRole);
  }

  async createTicket(projectName: string, createTicketDto: CreateTicketDto) {
    const project = await this.projectRepository.findOne({
      name: projectName,
    });
    const ticket = await this.ticketService.createTicket(createTicketDto);

    project.ticket.push(ticket);

    return this.projectRepository.findOneAndUpdate({ projectName }, { ticket });
  }

  async findAll() {
    return this.projectRepository.findProjects({});
  }

  async findOne(projectName: string) {
    return this.projectRepository.findOne({ name: projectName });
  }

  async update(projectName: string, updateProjectDto: UpdateProjectDto) {
    await this.projectRepository.findOneAndUpdate(
      { name: projectName },
      updateProjectDto,
    );

    return this.findOne(projectName);
  }

  async remove(projectName: string) {
    return this.projectRepository.deleteProject({ name: projectName });
  }
}
