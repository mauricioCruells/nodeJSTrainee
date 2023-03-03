import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateTicketDto } from 'src/tickets/dtos/create-ticket.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/jwt-auth/decorators/role.decorator';
import { TokenGuard } from 'src/jwt-auth/guards/token.guard';
import { RoleGuard } from 'src/jwt-auth/guards/role.guard';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Project } from '../schemas/project.schema';
import { Ticket } from 'src/tickets/schemas/ticket.schema';

@ApiTags('Project Operations')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({ summary: 'Creates new project' })
  @ApiCreatedResponse({
    description: 'A new project is created and the information is returned',
    type: Project,
  })
  @ApiConflictResponse({
    description: 'Project with that name already exists',
  })
  @ApiBody({ type: CreateProjectDto })
  @Roles('super admin')
  @UseGuards(AuthGuard('jwt'), TokenGuard, RoleGuard)
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @ApiOperation({ summary: 'List all projects' })
  @ApiOkResponse({
    description: 'List of all project',
    type: Project,
    isArray: true,
  })
  @Roles('super admin')
  @UseGuards(AuthGuard('jwt'), TokenGuard, RoleGuard)
  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @ApiOperation({ summary: 'Find one specific project by name' })
  @ApiOkResponse({
    description: 'single project',
    type: Project,
    isArray: true,
  })
  @ApiParam({ name: 'name', type: String, required: true, description: 'name' })
  @Roles('super admin, project admin')
  @UseGuards(AuthGuard('jwt'), TokenGuard, RoleGuard)
  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.projectsService.findOne(name);
  }

  @ApiOperation({ summary: 'Update project by name' })
  @ApiOkResponse({
    description: 'Project is updated and the information is returned',
    type: Project,
  })
  @ApiNotFoundResponse({
    description: 'Project with that name does not exist',
  })
  @ApiParam({ name: 'name', type: String, required: true, description: 'name' })
  @ApiBody({ type: UpdateProjectDto })
  @Roles('super admin')
  @UseGuards(AuthGuard('jwt'), TokenGuard, RoleGuard)
  @Patch(':name')
  update(
    @Param('name') name: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(name, updateProjectDto);
  }

  @ApiOperation({ summary: 'Delete project by name' })
  @ApiOkResponse({
    description: 'Project is deleted and the information is returned',
    type: Project,
  })
  @ApiNotFoundResponse({
    description: 'Project with that name does not exist',
  })
  @ApiParam({ name: 'name', type: String, required: true, description: 'name' })
  @Roles('super admin', 'project admin')
  @UseGuards(AuthGuard('jwt'), TokenGuard, RoleGuard)
  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.projectsService.remove(name);
  }

  @ApiOperation({ summary: 'Add user to project' })
  @ApiCreatedResponse({
    description: 'User is added to project and the information is returned',
    type: Project,
  })
  @ApiNotFoundResponse({
    description: 'Project with that name does not exist',
  })
  @ApiParam({
    name: 'title',
    type: String,
    required: true,
    description: 'title',
  })
  @ApiBody({ type: CreateUserDto })
  @Roles('super admin', 'project admin')
  @UseGuards(AuthGuard('jwt'), TokenGuard, RoleGuard)
  @Post(':title/user/')
  addUser(
    @Param('title') title: string,
    @Body('user') newUserInfo: CreateUserDto,
  ) {
    return this.projectsService.addUserToProject(title, newUserInfo);
  }

  @ApiOperation({ summary: 'Remove user from project' })
  @ApiOkResponse({
    description: 'User is removed from project and the information is returned',
    type: Project,
  })
  @ApiNotFoundResponse({
    description: 'Project with that name does not exist',
  })
  @ApiParam({ name: 'name', type: String, required: true, description: 'name' })
  @ApiParam({
    name: 'userId',
    type: String,
    required: true,
    description: 'userId',
  })
  @Roles('super admin', 'project admin')
  @UseGuards(AuthGuard('jwt'), TokenGuard, RoleGuard)
  @Patch(':name/user/:userId')
  changeUserRole(
    @Param('name') name: string,
    @Param('userId') userId: string,
    @Body() newRole: string,
  ) {
    return this.projectsService.changeUserRole(name, userId, newRole);
  }

  @ApiOperation({ summary: 'creates a ticket' })
  @ApiOkResponse({
    description: 'Ticket is created and the information is returned',
    type: Ticket,
  })
  @ApiNotFoundResponse({
    description: 'Project with that name does not exist',
  })
  @ApiParam({ name: 'name', type: String, required: true, description: 'name' })
  @ApiBody({ type: CreateTicketDto })
  @Post(':name/ticket')
  createTicket(
    @Param('name') name: string,
    @Body('ticket') createTicketDto: CreateTicketDto,
  ) {
    return this.projectsService.createTicket(name, createTicketDto);
  }
}
