import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RentalService } from './rental.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/role.guard';
import { Roles } from '../auth/decorator/role.decorator';
import { Role } from '../auth/interfaces/role.enum';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtInfo } from '../auth/interfaces/jwtinfo.type';
import { ParamDto } from './dto/param.dto';
import { QueryDto } from '../movies/dto/query.dto';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly rentalService: RentalService,
  ) {}

  @ApiTags('Movie Transactions')
  @Get('/mytransactions')
  findMyRentals(@GetUser() user: JwtInfo) {
    return this.rentalService.findMyMovies(user);
  }

  @ApiTags('Users')
  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.usersService.findAll();
  }

  @ApiTags('Users')
  @Get(':userId')
  @Roles(Role.Admin)
  findOne(@Param() userParam: ParamDto) {
    return this.usersService.findOne(+userParam.userId);
  }

  @ApiTags('Users')
  @Patch(':userId')
  @Roles(Role.Admin)
  update(
    @Param() userParam: ParamDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+userParam.userId, updateUserDto);
  }

  @ApiTags('Users')
  @Delete(':userId')
  @Roles(Role.Admin)
  remove(@Param() userParam: ParamDto) {
    return this.usersService.remove(+userParam.userId);
  }

  @ApiTags('Movie Transactions')
  @Post('/rent/')
  rentMovie(@GetUser() user: JwtInfo, @Query() query: QueryDto) {
    return this.rentalService.rentMovie(user, query);
  }

  @ApiTags('Movie Transactions')
  @Post('/return/:movieid')
  returnMovie(
    @GetUser() user: JwtInfo,
    @Param('movieid') movieId: string,
  ) {
    return this.rentalService.returnMovie(user, +movieId);
  }

  @ApiTags('Movie Transactions')
  @Post('/buy/')
  buyMovie(@GetUser() user: JwtInfo, @Query() query: QueryDto) {
    return this.rentalService.buyMovie(user, query);
  }
}
