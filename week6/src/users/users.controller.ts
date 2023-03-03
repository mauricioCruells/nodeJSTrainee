import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { NewsUserDto } from './dto/news_user.dto';
import { UsersService } from './users.service';

@Controller({
  path: 'users',
  version: '1',
})
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: number,
    @Body() newsUser: NewsUserDto,
  ) {
    return this.usersService.updateOne(id, newsUser);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number) {
    return this.usersService.deleteOne(id);
  }
}
