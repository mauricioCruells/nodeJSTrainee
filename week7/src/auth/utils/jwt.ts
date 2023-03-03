import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import Account from '../entities/account.entity';
import * as argon from 'argon2';

@Injectable()
export class JwtValidator {
  public signToken(user: Account): Promise<string> {
    const jwt = new JwtService();
    const {
      user_id: { user_id: userId, email },
      role,
      username,
    } = user;

    const data = { sub: userId, email, role, username };

    return jwt.signAsync(data, {
      secret: process.env.SECRET,
      expiresIn: '1d',
    });
  }

  public async validatePassword(hash: string, password: string) {
    const passwordCorrect = await argon.verify(hash, password);

    if (!passwordCorrect) {
      throw new ForbiddenException('Password is incorrect');
    }
  }

  public async hashPassword(password: string) {
    return argon.hash(password);
  }
}
