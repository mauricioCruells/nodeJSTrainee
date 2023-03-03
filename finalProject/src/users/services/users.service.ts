import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRepository } from '../repositories/user.repository';
import { FilterQuery } from 'mongoose';
import { User } from '../schemas/user.schema';
import { TicketService } from '../../tickets/services/tickets.service';
import { TokenPayload } from 'src/jwt-auth/dtos/token-payload.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly ticketService: TicketService,
  ) {}
  create(newUserInfo: CreateUserDto) {
    return this.userRepository.createUser(newUserInfo);
  }

  async findAll(user: Partial<TokenPayload>) {
    const options = {};

    // filter out users only for the projects of the project admin

    // if (user.role === 'project admin') {
    //   options = { projects: user.projects };
    // }

    return this.userRepository.findUsers(options);
  }

  async findOne(userOptions: FilterQuery<User>) {
    return this.userRepository.findOne(userOptions);
  }

  async update(id: string, updatedUserInfo: UpdateUserDto) {
    return this.userRepository.findOneAndUpdate({ _id: id }, updatedUserInfo);
  }

  async remove(id: string) {
    return this.userRepository.findOneAndDelete({ _id: id });
  }

  async assignTicket(userId: string, ticketId: string) {
    const ticket = await this.ticketService.getTicketById(ticketId);

    if (!ticket) {
      throw new NotFoundException('ticket not found');
    }

    return this.userRepository.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { tickets: ticket } },
    );
  }
}
