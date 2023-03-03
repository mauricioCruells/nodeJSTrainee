import {
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Account from './entities/account.entity';
import { Repository } from 'typeorm';
import { AccountDto } from './dto/account.dto';
import * as argon from 'argon2';
import { NewsUserDto } from 'src/users/dto/news_user.dto';
import NewsUser from 'src/users/entities/news_user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Payload } from './decorator/get-user.decorator';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(NewsUser)
    private newsUsersRepository: Repository<NewsUser>,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(account: AccountDto) {
    // find user by email
    const user = await this.accountRepository.findOne({
      where: { username: account.username },
    });

    if (!user) {
      throw new ForbiddenException('Username not found');
    }
    // compare password
    const passwordCorrect = await argon.verify(
      user.password,
      account.password,
    );

    if (!passwordCorrect) {
      throw new ForbiddenException('Password is incorrect');
    }
    //logged in status and last_login date
    await this.accountRepository.update(
      { user_id: user.user_id },
      { is_logged_in: true, last_login: new Date() },
    );

    const loggedUser = await this.accountRepository.find({
      select: {
        user_id: {
          user_id: true,
          first_name: true,
          last_name: true,
          email: true,
          created_at: true,
          updated_at: true,
        },
        role: true,
        username: true,
      },
      where: {
        user_id: user.user_id,
      },
      relations: {
        user_id: true,
      },
    });

    // generate jwt and return
    const token = await this.signToken(
      loggedUser[0].user_id.user_id,
      loggedUser[0].user_id.email,
      loggedUser[0].role,
      loggedUser[0].username,
    );

    return {
      status: 'OK',
      message: 'Login successful',
      userInfo: {
        username: loggedUser[0].username,
        role: loggedUser[0].role,
        ...loggedUser[0].user_id,
        token,
      },
    };
  }

  async signOut(user: Payload) {
    await this.accountRepository.update(user.sub, {
      is_logged_in: false,
    });

    return {
      status: 'OK',
      message: 'Logout successful',
      userInfo: { user_id: user.sub },
    };
  }

  async signUp(newsUser: NewsUserDto, account: AccountDto) {
    //generate password
    const hash = await argon.hash(account.password);

    //save user and account into db
    await this.newsUsersRepository.manager.transaction(
      async (manager) => {
        try {
          const user = new NewsUser();

          user.first_name = newsUser.first_name;
          user.last_name = newsUser.last_name;
          user.email = newsUser.email;

          await manager.save(user);

          const accountInfo = new Account();

          accountInfo.username = account.username;
          accountInfo.password = hash;
          accountInfo.user_id = user;

          await manager.save(accountInfo);
        } catch (error) {
          if (+error.code === 23505) {
            throw new ConflictException(error.detail);
            //some error.detail parsing should be attempted here, pending work
          } else {
            throw new InternalServerErrorException();
          }
        }
      },
    );

    //return the user
    return {
      status: 'OK',
      message: 'User succesfully created',
      userInfo: { ...newsUser, username: account.username },
    };
  }

  async signToken(
    userId: number,
    email: string,
    role: string,
    username: string,
  ): Promise<string> {
    const data = { sub: userId, email, role, username };
    return this.jwt.signAsync(data, {
      secret: this.configService.get('SECRET'),
      expiresIn: '1d',
    });
  }
}
