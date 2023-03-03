import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Ticket Management System')
    .setDescription('API for ticket management system using oauth2.0')
    .setVersion('1.0.0')
    .addSecurity('oauth2', {
      type: 'oauth2',
      flows: {
        implicit: {
          authorizationUrl: process.env.GOOGLE_AUTH_URL,
          scopes: {
            'userinfo.email': 'registered email on google account',
            'userinfo.profile': 'public google account information',
          },
        },
      },
    })
    .addBearerAuth()
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'API',
    swaggerOptions: {
      persistAuthorization: true,
      oauth2RedirectUrl: process.env.GOOGLE_CALLBACK_URL,
      initOAuth: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        scopes: ['userinfo.email', 'userinfo.profile'],
      },
    },
  });

  await app.listen(process.env.PORT);
}
bootstrap();
