import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { TicketService } from '../services/tickets.service';
import { CreateTicketDto } from '../dtos/create-ticket.dto';
import { Ticket, TicketDocument } from '../schemas/ticket.schema';
import { CreateStatusDto } from '../dtos/create-status.dto';
import { Status, StatusDocument } from '../schemas/statuses.schema';
import { Comment } from '../schemas/comment.schema';
import { CommentDTO } from '../dtos/comment.dto';
import { plainToClass } from 'class-transformer';
import { Roles } from 'src/jwt-auth/decorators/role.decorator';
import { TokenGuard } from 'src/jwt-auth/guards/token.guard';
import { RoleGuard } from 'src/jwt-auth/guards/role.guard';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Ticket Operations')
@Controller({ path: 'tickets', version: '1' })
export class TicketsController {
  constructor(private readonly ticketService: TicketService) {}

  @ApiOperation({ summary: 'Creates new ticket' })
  @ApiCreatedResponse({
    description: 'A new ticket is created',
    type: Ticket,
  })
  @ApiBody({ type: CreateTicketDto })
  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.createTicket(createTicketDto);
  }

  @ApiBearerAuth()
  @Roles('project admin')
  @UseGuards(AuthGuard('jwt'), TokenGuard, RoleGuard)
  @ApiOperation({ summary: 'List all tickets' })
  @ApiOkResponse({
    description: 'List of all tickets',
    type: Ticket,
    isArray: true,
  })
  @Get()
  async getAllTickets(): Promise<TicketDocument[]> {
    return this.ticketService.getAllTickets();
  }

  @ApiOperation({ summary: 'Find one specific ticket by id' })
  @ApiOkResponse({
    description: 'Single ticket',
    type: Ticket,
  })
  @ApiNotFoundResponse({ description: 'Ticket not found with id provided' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Ticket id to find',
    type: 'string',
  })
  @Get(':id')
  async getTicketById(@Param('id') id: string): Promise<TicketDocument> {
    return this.ticketService.getTicketById(id);
  }

  @ApiBearerAuth()
  @Roles('support user')
  @UseGuards(AuthGuard('jwt'), TokenGuard, RoleGuard)
  @ApiOperation({ summary: 'Update the status of a ticket' })
  @ApiOkResponse({
    description: 'Ticket with new status update',
    type: Ticket,
  })
  @ApiBadRequestResponse({ description: 'Wrong status' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Ticket id to find',
    type: 'string',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          description: 'New status to update to',
        },
      },
    },
  })
  @Put('/:ticketId/status')
  async updateStatus(
    @Param('ticketId') ticketId: string,
    @Body('status') status: string,
  ) {
    try {
      const updatedTicket = await this.ticketService.updateStatus(
        ticketId,
        status,
      );
      return {
        message: 'Ticket status updated successfully',
        data: updatedTicket,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiBearerAuth()
  @Roles('super admin')
  @UseGuards(AuthGuard('jwt'), TokenGuard, RoleGuard)
  @ApiOperation({ summary: 'Delete ticket' })
  @ApiOkResponse({
    description: 'Ticket deleted succesfully',
  })
  @ApiNotFoundResponse({ description: 'Ticket not found with id provided' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Ticket id to delete',
    type: 'string',
  })
  @Delete(':id')
  async deleteTicket(@Param('id') id: string): Promise<TicketDocument> {
    return this.ticketService.deleteTicket(id);
  }

  @ApiBearerAuth()
  @Roles('support user')
  @UseGuards(AuthGuard('jwt'), TokenGuard, RoleGuard)
  @ApiOperation({ summary: 'Find all tickets assigned to a user' })
  @ApiOkResponse({
    description: 'List of tickets assigned',
    type: Ticket,
    isArray: true,
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'User id to query for tickets',
    type: 'string',
  })
  @Get('assigned/:userId')
  async getAssignedTickets(@Param('userId') userId: string) {
    return await this.ticketService.getAssignedTickets(userId);
  }

  @ApiBearerAuth()
  @Roles('project admin')
  @UseGuards(AuthGuard('jwt'), TokenGuard, RoleGuard)
  @ApiOperation({ summary: 'Assign ticket to user' })
  @ApiOkResponse({
    description: 'Ticket assigned to user',
    type: Ticket,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ticket id to assign to user',
    type: 'string',
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'Target userId',
    type: 'string',
  })
  @Put(':id/assign/:userId')
  async assignTicketToUser(
    @Param('id') ticketId: string,
    @Param('userId') userId: string,
  ): Promise<TicketDocument> {
    return this.ticketService.assignTicketToUser(ticketId, userId);
  }

  @ApiBearerAuth()
  @Roles('super admin')
  @UseGuards(AuthGuard('jwt'), TokenGuard, RoleGuard)
  @ApiOperation({ summary: 'Create a new status for a project' })
  @ApiCreatedResponse({
    description: 'New status created',
    type: Status,
  })
  @ApiBody({
    description: 'New status information',
    type: CreateStatusDto,
  })
  @Post('status')
  async createStatus(
    @Body() createStatusDto: CreateStatusDto,
  ): Promise<StatusDocument> {
    return this.ticketService.createStatus(createStatusDto);
  }

  @ApiBearerAuth()
  @Roles('super admin')
  @UseGuards(AuthGuard('jwt'), TokenGuard, RoleGuard)
  @ApiOperation({ summary: 'Delete a status for a project' })
  @ApiOkResponse({
    description: 'Status deleted succesfully',
  })
  @ApiParam({
    name: 'id',
    description: 'Status id to delete',
    type: 'string',
  })
  @Delete('status/:id')
  async deleteStatus(@Param('id') id: string) {
    return await this.ticketService.deleteStatus(id);
  }

  @ApiOperation({ summary: 'Add a comment to a ticket' })
  @ApiOkResponse({
    description: 'Comment added succesfully to ticket',
    type: Ticket,
  })
  @ApiParam({
    name: 'ticketId',
    description: 'ticket id to target',
    type: 'string',
  })
  @ApiBody({
    description: 'Final comment information',
    type: CommentDTO,
  })
  @Post(':ticketId/comments')
  async addComment(
    @Param('ticketId') ticketId: string,
    @Body() commentDto: CommentDTO,
  ): Promise<Ticket> {
    return await this.ticketService.addComment(
      ticketId,
      plainToClass(Comment, commentDto),
    );
  }

  @ApiBearerAuth()
  @Roles('project admin')
  @UseGuards(AuthGuard('jwt'), TokenGuard, RoleGuard)
  @ApiOperation({ summary: 'Close ticket and add final comment' })
  @ApiOkResponse({
    description: 'Ticket closed succesfully',
    type: Ticket,
  })
  @ApiParam({
    name: 'ticketId',
    description: 'ticket id to target by new comment',
    type: 'string',
  })
  @ApiBody({
    description: 'comment information',
    type: CommentDTO,
  })
  @Put(':ticketId/close')
  async closeTicketWithComment(
    @Param('ticketId') ticketId: string,
    @Body() commentDto: CommentDTO,
  ): Promise<Ticket> {
    return await this.ticketService.closeTicketWithComment(
      ticketId,
      plainToClass(Comment, commentDto),
    );
  }
}
