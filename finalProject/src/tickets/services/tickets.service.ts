import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTicketDto } from '../dtos/create-ticket.dto';
import { Ticket, TicketDocument } from '../schemas/ticket.schema';
import { TicketRepository } from '../repositories/ticket.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { Status, StatusDocument } from '../schemas/statuses.schema';
import { Comment } from 'src/tickets/schemas/comment.schema';
import { CreateStatusDto } from '../dtos/create-status.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
    @InjectModel(Status.name)
    private readonly statusModel: Model<StatusDocument>,
    private mailerService: MailerService,
    private ticketRepository: TicketRepository,
  ) {}

  async createTicket(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const { email, title, description } = createTicketDto;
    const newTicket = new this.ticketModel({
      email,
      title,
      description,
    });
    return await newTicket.save();
  }

  async getAllTickets(): Promise<TicketDocument[]> {
    return this.ticketRepository.getAllTickets();
  }

  async getTicketById(ticketId: string): Promise<TicketDocument> {
    return this.ticketRepository.findById(ticketId);
  }

  async deleteTicket(ticketId: string): Promise<TicketDocument> {
    return this.ticketRepository.deleteTicket(ticketId);
  }

  async createStatus(
    createStatusDto: CreateStatusDto,
  ): Promise<StatusDocument> {
    const { name, next } = createStatusDto;
    const newStatus = new this.statusModel({
      name: name,
      next: next,
    });
    return newStatus.save();
  }

  async deleteStatus(statusId: string): Promise<StatusDocument> {
    return this.ticketRepository.deleteStatus(statusId);
  }

  async validateStatus(name: string): Promise<string | Error> {
    const status = await this.statusModel.findOne({ name });
    if (status) {
      return status._id;
    } else {
      return new Error('Invalid status');
    }
  }

  async updateStatus(ticketId: string, name: string) {
    const statusId = await this.validateStatus(name);
    if (statusId instanceof Error) {
      throw new BadRequestException(statusId.message);
    }
    const updatedTicket = await this.ticketRepository.updateStatus(
      ticketId,
      statusId,
    );
    await this.sendEmail(updatedTicket.email, name, updatedTicket._id);
    return updatedTicket;
  }

  async addComment(ticketId: string, comment: Comment): Promise<Ticket> {
    return await this.ticketRepository.addComment(ticketId, comment);
  }

  async sendEmail(email: string, status: string, ticketId: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: `Ticket status has been updated to ${status} for ticket# ${ticketId}`,
      text: `Your ticket with ID: ${ticketId} status has been updated to ${status}. Thank you for using our service.`,
    });
  }

  async assignTicketToUser(
    ticketId: string,
    userId: string,
  ): Promise<TicketDocument> {
    return this.ticketRepository.assignTicketToUser(ticketId, userId);
  }

  async getAssignedTickets(userId: string): Promise<TicketDocument[]> {
    return this.ticketRepository.findAssignedTickets(userId);
  }

  async closeTicketWithComment(
    ticketId: string,
    comment: Comment,
  ): Promise<Ticket> {
    const closedTicket = await this.ticketRepository.closeTicketWithComment(
      ticketId,
      comment,
    );

    const email = closedTicket.email;
    const status = closedTicket.status;
    this.sendEmail(email, status, ticketId);

    return closedTicket;
  }
}
