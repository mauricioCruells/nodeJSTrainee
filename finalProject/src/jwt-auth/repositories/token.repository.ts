import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Token, TokenDocument } from '../schemas/token.schema';

@Injectable()
export class tokenRepository {
  constructor(
    @InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>,
  ) {}

  async createToken(newTokenInfo: Token): Promise<Token> {
    const newToken = new this.tokenModel(newTokenInfo);
    return newToken.save();
  }

  async findOneAndDelete(tokenFilterQuery: FilterQuery<Token>): Promise<Token> {
    return this.tokenModel.findOneAndDelete(tokenFilterQuery);
  }
}
