import { Module } from '@nestjs/common';
import { ProjectsService } from './services/projects.service';
import { ProjectsController } from './controllers/projects.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './schemas/project.schema';
import { ProjectRepository } from './repositories/project.repository';
import { UsersService } from '../users/services/users.service';
import { RoleRepository } from '../roles/repositories/role.repository';
import { UserRepository } from 'src/users/repositories/user.repository';
import { TicketRepository } from 'src/tickets/repositories/ticket.repository';
import { TicketService } from 'src/tickets/services/tickets.service';
import { Role, RoleSchema } from 'src/roles/schemas/role.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { Ticket, TicketSchema } from 'src/tickets/schemas/ticket.schema';
import { Status, StatusSchema } from 'src/tickets/schemas/statuses.schema';
import { Comment, CommentSchema } from 'src/tickets/schemas/comment.schema';
import { Token, TokenSchema } from 'src/jwt-auth/schemas/token.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: Role.name, schema: RoleSchema },
      { name: User.name, schema: UserSchema },
      { name: Ticket.name, schema: TicketSchema },
      { name: Status.name, schema: StatusSchema },
      { name: Comment.name, schema: CommentSchema },
      { name: Token.name, schema: TokenSchema },
    ]),
  ],
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    ProjectRepository,
    UsersService,
    RoleRepository,
    UserRepository,
    TicketRepository,
    TicketService,
    JwtService,
  ],
})
export class ProjectsModule {}
