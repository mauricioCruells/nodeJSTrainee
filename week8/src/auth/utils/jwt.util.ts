import { ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { User } from 'src/users/entities/user.entity';

export async function signToken(user: User): Promise<string> {
  const jwt = new JwtService();
  const { userId } = user;

  const data = { sub: userId };

  return jwt.signAsync(data, {
    secret: process.env.JWT_SECRET,
    expiresIn: '1d',
  });
}

export async function validatePassword(
  hash: string,
  password: string,
): Promise<void> {
  const passwordCorrect = await argon.verify(hash, password);

  if (!passwordCorrect) {
    throw new ForbiddenException('Password is incorrect');
  }
}

export async function hashPassword(
  password: string,
): Promise<string> {
  return argon.hash(password);
}
