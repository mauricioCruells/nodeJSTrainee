import { Injectable } from '@nestjs/common';
import { NewsUserDto } from 'src/users/dto/news_user.dto';
import { AccountDto } from '../dto/account.dto';
import Account from '../entities/account.entity';
import { AccountRepository } from '../repositories/account.repository';
import { JwtValidator } from '../utils/jwt';

@Injectable()
export class AccountFacade {
  constructor(
    private accountRepository: AccountRepository,
    private jwtValidator: JwtValidator,
  ) {}

  async findAccountByUsername(username: string) {
    return this.accountRepository.findAccountByUsername(username);
  }

  async findJointUserAccount(user: Account) {
    return this.accountRepository.findJointUserAccount(user);
  }

  async updatedLoggedInStatus(user: Account, state: boolean) {
    return this.accountRepository.updatedLoggedInStatus(user, state);
  }

  async createNewUserAccount(
    newsUser: NewsUserDto,
    account: AccountDto,
    hash: string,
  ) {
    return this.accountRepository.createNewUserAccount(
      newsUser,
      account,
      hash,
    );
  }

  async validatePassword(hash: string, password: string) {
    return this.jwtValidator.validatePassword(hash, password);
  }

  async createToken(user: Account) {
    return this.jwtValidator.signToken(user);
  }

  async hashPassword(password: string) {
    return this.jwtValidator.hashPassword(password);
  }

  async validatePasswordAndSignIn(account: AccountDto) {
    const user = await this.findAccountByUsername(account.username);

    await this.validatePassword(user.password, account.password);

    await this.updatedLoggedInStatus(user, true);

    const loggedUser = await this.findJointUserAccount(user);

    const token = await this.createToken(loggedUser);

    const response = {
      username: loggedUser.username,
      role: loggedUser.role,
      ...loggedUser.user_id,
      token,
    };

    return response;
  }

  async createUserWithHashedPassword(
    newsUser: NewsUserDto,
    account: AccountDto,
  ) {
    const hash = await this.hashPassword(account.password);

    await this.createNewUserAccount(newsUser, account, hash);
  }
}
