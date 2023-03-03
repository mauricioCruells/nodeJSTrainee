import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import NewsUser from 'src/users/entities/news_user.entity';
import { Repository } from 'typeorm';
import { Payload } from '../decorator/get-user.decorator';
import Account from '../entities/account.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(NewsUser)
    private newsUsersRepository: Repository<NewsUser>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('SECRET'),
    });
  }

  async validate(payload: Payload) {
    //find a user with the requested payload
    const accountState = await this.accountRepository.find({
      select: { is_logged_in: true },
      where: { username: payload.username },
    });

    //find out if the user is signed in, that means jwt is valid
    if (!accountState[0].is_logged_in) {
      throw new ForbiddenException('Please sign in');
    }

    return payload;
  }
}
