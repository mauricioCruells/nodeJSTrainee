import { Injectable } from '@nestjs/common';
import { AccountDto } from './dto/account.dto';

import { NewsUserDto } from 'src/users/dto/news_user.dto';
import { Payload } from './decorator/get-user.decorator';
import { AccountFacade } from './facades/account.facade';

@Injectable()
export class AuthService {
  constructor(private accountFacade: AccountFacade) {}

  async signIn(account: AccountDto) {
    const signInInfo =
      await this.accountFacade.validatePasswordAndSignIn(account);

    return {
      status: 'OK',
      message: 'Login successful',
      data: [signInInfo],
    };
  }

  async signOut(userInfo: Payload) {
    const user = await this.accountFacade.findAccountByUsername(
      userInfo.username,
    );

    await this.accountFacade.updatedLoggedInStatus(user, false);

    return {
      status: 'OK',
      message: 'Logout successful',
      data: [{ user_id: userInfo.sub }],
    };
  }

  async signUp(newsUser: NewsUserDto, account: AccountDto) {
    this.accountFacade.createUserWithHashedPassword(
      newsUser,
      account,
    );

    return {
      status: 'OK',
      message: 'User succesfully created',
      data: [{ ...newsUser, username: account.username }],
    };
  }
}
