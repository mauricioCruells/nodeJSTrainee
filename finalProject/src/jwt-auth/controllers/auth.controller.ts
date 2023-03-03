import { Controller, Post, UseGuards, Req, HttpCode } from '@nestjs/common';
import { JwtAuthService } from '../services/jwt-auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import {
  ApiTags,
  ApiBearerAuth,
  ApiProduces,
  ApiProperty,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiTags('JWT Auth')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  @ApiOperation({
    summary: 'Deletes stored token generated previously by google oauth 2.0',
  })
  @ApiOkResponse({ description: 'Token succesfully removed' })
  @ApiBearerAuth()
  @HttpCode(200)
  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  logout(@Req() req: Request) {
    return this.jwtAuthService.logout(req);
  }
}
