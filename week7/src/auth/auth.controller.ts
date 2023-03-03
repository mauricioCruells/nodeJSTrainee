import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { NewsUserDto } from 'src/users/dto/news_user.dto';
import { AuthService } from './auth.service';
import { GetUser, Payload } from './decorator/get-user.decorator';
import { AccountDto } from './dto/account.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() account: AccountDto) {
    return this.authService.signIn(account);
  }

  @UseGuards(JwtAuthGuard)
  @Post('signout')
  signOut(@GetUser() user: Payload) {
    return this.authService.signOut(user);
  }

  @Post('signup')
  async signUp(
    @Body() newsUser: NewsUserDto,
    @Body() account: AccountDto,
  ) {
    return this.authService.signUp(newsUser, account);
  }
}
