import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendPasswordReset(user: User, newPassword: string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Password Reset Information | Movie Rentals',
      template: './password-reset',
      context: {
        name: user.firstName,
        password: newPassword,
      },
    });
  }

  async sendRentalReceipt(user: User, rentals) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Rental Receipt | Movie Rentals',
      template: './movie-rent',
      context: {
        name: user.firstName,
        rentals,
      },
    });
  }

  async sendBuyReceipt(user: User, buys) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Purchase Receipt | Movie Rentals',
      template: './movie-buy',
      context: {
        name: user.firstName,
        buys: buys.buys,
        total: buys.total,
      },
    });
  }
}
