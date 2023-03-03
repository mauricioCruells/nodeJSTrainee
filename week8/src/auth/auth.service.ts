import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtInfo } from './interfaces/jwtinfo.type';
import { UserRepository } from 'src/users/repositories/user.repository';
import { UsersService } from 'src/users/users.service';
import {
  hashPassword,
  signToken,
  validatePassword,
} from './utils/jwt.util';
import { generate } from 'randomstring';
import { SignInDto } from './dto/sigin.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private userRepository: UserRepository,
    private mailService: MailService,
  ) {}

  async signIn(credentials: SignInDto) {
    const user = await this.userService.findOne(credentials);

    await validatePassword(user.password, credentials.password);

    await this.userRepository.updatedLoggedInStatus(user, true);

    const token = await signToken(user);

    return {
      status: 'OK',
      message: 'Login successful',
      userInfo: {
        username: credentials.username,
        token,
      },
    };
  }

  async signOut(userInfo: JwtInfo) {
    const user = await this.userService.findOne(userInfo.sub);

    await this.userRepository.updatedLoggedInStatus(user, false);

    return {
      status: 'OK',
      message: 'Logout successful',
      data: [{ userId: userInfo.sub }],
    };
  }

  async signUp(userInfo: CreateUserDto) {
    userInfo.password = await hashPassword(userInfo.password);
    return this.userRepository.createOneUser(userInfo);
  }

  async changeRole(
    currentUser: JwtInfo,
    userId: number,
    newRole: string,
  ) {
    const user = await this.userService.findOne(userId);

    if (currentUser.sub !== user.userId) {
      return this.userRepository.updateRole(user, newRole);
    } else {
      throw new ConflictException(
        `Can't change your own role, ask another admin for help`,
      );
    }
  }

  async updatePassword(
    userInfo: JwtInfo | number,
    newPassword: string,
  ) {
    const hashedPassword = await hashPassword(newPassword);
    let userId: number;

    if (typeof userInfo === 'number') {
      userId = userInfo;
    } else {
      userId = userInfo.sub;
    }

    return this.userService.update(userId, {
      password: hashedPassword,
    });
  }

  async resetPassword(email: string) {
    const user = await this.userService.findOne(email);

    const randomPassword = generate({ readable: true, length: 10 });

    const updatedInfo = await this.updatePassword(
      user.userId,
      randomPassword,
    );

    await this.mailService.sendPasswordReset(user, randomPassword);
    return { ...updatedInfo };
  }

  async createAdminUser() {
    const users = await this.userService.findAll();

    if (users.length === 0) {
      const adminUser: CreateUserDto = {
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@admin.com',
        username: 'admin',
        password: 'admin',
      };

      const currentUser: JwtInfo = {
        sub: 0,
        iat: 0,
        exp: 0,
      };

      const admin = await this.signUp(adminUser);

      await this.changeRole(currentUser, admin.userId, 'admin');
    }
  }
}
