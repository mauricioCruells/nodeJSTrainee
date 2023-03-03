import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AllSourcesGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const secret = `${this.configService.get<string>('SECRET')}`;

    return this.canAccessNYT(request, secret);
  }

  private canAccessNYT(request: Request, secret: string): boolean {
    const source = String(
      request.query['source'],
    ).toLocaleLowerCase();

    try {
      if (source === 'guardian') {
        return true;
      }

      if (source === 'nyt' || source === 'both') {
        const bearerToken = request.headers['authorization'];

        if (!bearerToken) {
          return false;
        }

        verify(bearerToken.split(' ')[1], secret);
      }

      return true;
    } catch {
      throw new UnauthorizedException(
        'No access to NYT resource please provide token',
      );
    }
  }
}
