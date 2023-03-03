import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleOauthGuard } from '../guards/google-oauth.guard';
import { JwtAuthService } from '../../jwt-auth/services/jwt-auth.service';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('auth/google')
export class GoogleOauthController {
  constructor(private jwtAuthService: JwtAuthService) {}

  @Get('login')
  @UseGuards(GoogleOauthGuard)
  googleAuth(): void {
    return;
  }

  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    const token = await this.jwtAuthService.login(req.user);

    return res.status(HttpStatus.OK).send({ ...req.user, token });
  }
}
