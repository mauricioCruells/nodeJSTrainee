import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { getEnvPath } from '../common';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';

const envFilePath: string = getEnvPath(`${__dirname}/../../`);

config({ path: envFilePath });

export const mailOptions: MailerAsyncOptions = {
  useFactory: async (configService: ConfigService) => ({
    transport: {
      host: configService.get('MAIL_HOST'),
      port: configService.get('MAIL_PORT'),
      secure: false,
      auth: {
        user: configService.get('MAIL_USER'),
        pass: configService.get('MAIL_PASSWORD'),
      },
    },
    defaults: {
      from: `"No Reply" <${configService.get('MAIL_FROM')}>`,
    },
    template: {
      dir: join(__dirname, 'templates'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  }),
  inject: [ConfigService],
};
