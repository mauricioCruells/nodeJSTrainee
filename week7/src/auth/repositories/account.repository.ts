import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { NewsUserDto } from 'src/users/dto/news_user.dto';
import NewsUser from 'src/users/entities/news_user.entity';
import { DataSource, Repository } from 'typeorm';
import { AccountDto } from '../dto/account.dto';
import Account from '../entities/account.entity';

@Injectable()
export class AccountRepository extends Repository<Account> {
  constructor(private dataSource: DataSource) {
    super(Account, dataSource.createEntityManager());
  }

  async findAccountByUsername(username: string) {
    const user = await this.findOne({
      where: { username },
    });

    if (!user) {
      throw new UnauthorizedException('Username not found');
    }

    return user;
  }

  async findJointUserAccount(user: Account) {
    const jointUser = await this.findOne({
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

    if (!jointUser) {
      throw new NotFoundError('user not found');
    }

    return jointUser;
  }

  async updatedLoggedInStatus(user: Account, state: boolean) {
    await this.update(
      { user_id: user.user_id },
      { is_logged_in: state, last_login: new Date() },
    );
  }

  async createNewUserAccount(
    newsUser: NewsUserDto,
    account: AccountDto,
    hash: string,
  ) {
    //save user and account into db
    await this.manager.transaction(async (manager) => {
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
    });
  }
}
