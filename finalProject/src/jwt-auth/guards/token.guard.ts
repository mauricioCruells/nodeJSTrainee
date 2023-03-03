import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../dtos/token-payload.dto';
import { getBearer } from '../helpers/token.helper';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TokenDocument } from '../schemas/token.schema';
import { Model } from 'mongoose';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    @InjectModel(Token.name)
    private readonly tokenModel: Model<TokenDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req: Request = context.switchToHttp().getRequest();

      const tokenPayload = this.jwtService.decode(
        getBearer(req),
      ) as TokenPayload;

      const res = await this.tokenModel.findOne({
        where: { jti: tokenPayload.jti },
      });

      return res ? true : false;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
