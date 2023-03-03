import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { Request } from 'express';
import { TokenPayload } from '../dtos/token-payload.dto';
import { getBearer } from '../helpers/token.helper';
import { UserRepository } from 'src/users/repositories/user.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TokenDocument } from '../schemas/token.schema';
import { Model } from 'mongoose';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>,
  ) {}

  async findUserByEmail(email: string) {
    console.log('fetching user details for email: ', email);
    const user = await this.userRepository.findOne({ email: email });
    console.log('user: ', user);

    if (!user) {
      return null;
    }

    return user;
  }

  async login(user) {
    const userExists = await this.findUserByEmail(user.email);
    if (!userExists) {
      throw new BadRequestException('User does not exist');
    }

    const jti: string = randomStringGenerator();

    const payload = { email: userExists.email, sub: userExists._id };

    await this.tokenModel.findOneAndUpdate(
      { _id: userExists._id },
      { jti },
      { upsert: true, new: true },
    );

    return {
      accessToken: this.jwtService.sign(payload, {
        jwtid: jti,
      }),
    };
  }

  async logout(req: Request) {
    const token = this.jwtService.decode(getBearer(req)) as TokenPayload;

    return this.tokenModel.deleteOne({ _id: token.sub, jti: token.jti });
  }
}
