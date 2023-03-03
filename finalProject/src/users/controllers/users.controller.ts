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
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/jwt-auth/decorators/role.decorator';
import { TokenGuard } from 'src/jwt-auth/guards/token.guard';
import { RoleGuard } from 'src/jwt-auth/guards/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../schemas/user.schema';
import { GetUser } from 'src/jwt-auth/decorators/get-user.decorator';
import { TokenPayload } from 'src/jwt-auth/dtos/token-payload.dto';

@ApiBearerAuth()
@ApiTags('Users Operations')
@UseGuards(AuthGuard('jwt'), TokenGuard, RoleGuard)
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Creates new users' })
  @ApiCreatedResponse({
    description: 'A new user is created and the information is returned',
    type: User,
  })
  @ApiConflictResponse({
    description: 'Email from new user is already registered',
  })
  @ApiBody({ type: CreateUserDto })
  @Post()
  @Roles('super admin', 'project admin')
  create(@Body() newUserInfo: CreateUserDto) {
    return this.usersService.create(newUserInfo);
  }

  @ApiOperation({ summary: 'List all users' })
  @ApiOkResponse({
    description:
      "List of all users, project admins should only get their project's users",
    type: User,
    isArray: true,
  })
  @Get()
  @Roles('super admin')
  findAll(@GetUser() user: Partial<TokenPayload>) {
    return this.usersService.findAll(user);
  }

  @ApiOperation({ summary: 'Find one specific user by id' })
  @ApiOkResponse({
    description: 'Single user',
    type: User,
  })
  @ApiNotFoundResponse({ description: 'User not found with id provided' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'User id to find',
    type: 'string',
  })
  @Get(':id')
  @Roles('super admin')
  findOne(@Param('id') userId: string) {
    return this.usersService.findOne({ _id: userId });
  }

  @ApiOperation({
    summary: 'Update user information, can be used to change role',
  })
  @ApiOkResponse({
    description: 'User with updated information',
    type: User,
  })
  @ApiNotFoundResponse({ description: 'User not found with id provided' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'User id to update',
    type: 'string',
  })
  @ApiBody({ type: UpdateUserDto })
  @Patch(':id')
  @Roles('super admin', 'project admin')
  update(@Param('id') userId: string, @Body() updatedUserInfo: UpdateUserDto) {
    return this.usersService.update(userId, updatedUserInfo);
  }

  @ApiOperation({ summary: 'Delete user, tickets are persisted' })
  @ApiOkResponse({
    description: 'User deleted succesfully',
  })
  @ApiNotFoundResponse({ description: 'User not found with id provided' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'User id to delete',
    type: 'string',
  })
  @Delete(':id')
  @Roles('super admin')
  remove(@Param('id') userId: string) {
    return this.usersService.remove(userId);
  }

  @ApiOperation({
    summary: 'Assign a ticket to a user',
  })
  @ApiNotFoundResponse({ description: 'User not found with id provided' })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'userId for assigning a ticket',
    type: 'string',
  })
  @ApiParam({
    name: 'ticketId',
    required: true,
    description: 'ticketId that will be assigned to user',
    type: 'string',
  })
  @Post(':userId/ticket/:ticketId')
  @Roles('project admin')
  assignTicket(
    @Param('userId') userId: string,
    @Param('ticketId') ticketId: string,
  ) {
    return this.usersService.assignTicket(userId, ticketId);
  }
}
