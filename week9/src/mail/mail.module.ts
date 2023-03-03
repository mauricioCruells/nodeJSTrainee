import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { mailOptions } from './mail.config';
import { MailService } from './mail.service';

@Module({
  imports: [MailerModule.forRootAsync(mailOptions)],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
