import { Module } from '@nestjs/common';
import { TicketService } from './services/tickets.service';
import { TicketsController } from './controllers/tickets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './schemas/ticket.schema';
import { TicketRepository } from './repositories/ticket.repository';
import { MailerModule } from '@nestjs-modules/mailer';
import { Status, StatusSchema } from './schemas/statuses.schema';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { Token, TokenSchema } from 'src/jwt-auth/schemas/token.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ticket.name, schema: TicketSchema },
      { name: Status.name, schema: StatusSchema },
      { name: Comment.name, schema: CommentSchema },
      { name: Token.name, schema: TokenSchema },
    ]),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
      },
      defaults: {
        from: process.env.MAIL_FROM,
      },
    }),
  ],
  controllers: [TicketsController],
  providers: [TicketService, TicketRepository, JwtService],
  exports: [TicketService, TicketRepository],
})
export class TicketsModule {}
