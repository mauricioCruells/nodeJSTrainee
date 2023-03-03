import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from 'src/tickets/schemas/ticket.schema';
import { Comment } from 'src/tickets/schemas/comment.schema';
import { CreateTicketDto } from '../dtos/create-ticket.dto';
import { Status, StatusDocument } from '../schemas/statuses.schema';
import mongoose from 'mongoose';
@Injectable()
export class TicketRepository {
  constructor(
    @InjectModel(Ticket.name)
    private readonly ticketModel: Model<TicketDocument>,
    @InjectModel(Status.name)
    private readonly statusModel: Model<StatusDocument>,
  ) {}

  async createTicket(ticket: CreateTicketDto): Promise<CreateTicketDto> {
    const createdTicket = new this.ticketModel(ticket);
    return createdTicket.save();
  }
  async deleteTicket(id: string): Promise<TicketDocument> {
    try {
      return await this.ticketModel.findByIdAndDelete(id).exec();
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to delete ticket with id ${id}`);
    }
  }

  async getAllTickets(): Promise<TicketDocument[]> {
    try {
      return await this.ticketModel.find().exec();
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to retrieve all tickets`);
    }
  }

  async findById(id: string): Promise<TicketDocument> {
    try {
      return await this.ticketModel.findById(id).exec();
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to retrieve ticket with id ${id}`);
    }
  }

  async assignTicketToUser(
    ticketId: string,
    userId: string,
  ): Promise<TicketDocument> {
    try {
      return await this.ticketModel
        .findByIdAndUpdate(
          ticketId,
          { $set: { assignedTo: userId } },
          { new: true },
        )
        .exec();
    } catch (error) {
      console.error(error);
      throw new Error(
        `Failed to assign ticket with id ${ticketId} to user ${userId}`,
      );
    }
  }

  async findAssignedTickets(userId: string): Promise<TicketDocument[]> {
    try {
      return await this.ticketModel.find({ assignedTo: userId }).exec();
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to retrieve assigned tickets for user ${userId}`);
    }
  }

  createStatus(name: string, next: string[]): Promise<StatusDocument> {
    const newStatus = new this.statusModel({
      name: name,
      next: next,
    });
    return newStatus.save();
  }

  async deleteStatus(statusId: string): Promise<StatusDocument> {
    return this.statusModel.findByIdAndDelete(statusId);
  }

  async updateStatus(
    ticketId: string,
    statusId: string,
  ): Promise<TicketDocument> {
    const objectId = new mongoose.Types.ObjectId(statusId);

    const updatedTicket = await this.ticketModel
      .findOneAndUpdate(
        { _id: ticketId },
        { $set: { status: objectId } },
        { new: true },
      )
      .populate('status')
      .exec();

    if (!updatedTicket) {
      throw new NotFoundException(`Ticket with id ${ticketId} not found`);
    }

    if (!updatedTicket.status) {
      throw new BadRequestException(`Invalid status id ${statusId}`);
    }

    return updatedTicket;
  }

  async addComment(
    ticketId: string,
    comment: Comment,
  ): Promise<TicketDocument> {
    const updatedTicket = await this.ticketModel
      .findByIdAndUpdate(
        ticketId,
        {
          $push: {
            comments: { text: comment.text, createdAt: comment.createdAt },
          },
        },
        { new: true },
      )
      .exec();

    if (!updatedTicket) {
      throw new NotFoundException(`Ticket with id ${ticketId} not found`);
    }

    return updatedTicket;
  }
  async closeTicketWithComment(
    ticketId: string,
    comment: Comment,
  ): Promise<TicketDocument> {
    return this.ticketModel
      .findByIdAndUpdate(
        ticketId,
        { $set: { status: 'Closed' }, $push: { comments: comment } },
        { new: true },
      )
      .exec();
  }
}
