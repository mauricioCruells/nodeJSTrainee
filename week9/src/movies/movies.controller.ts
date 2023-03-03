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
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/role.guard';
import { Roles } from '../auth/decorator/role.decorator';
import { Role } from '../auth/interfaces/role.enum';
import { QueryDto } from './dto/query.dto';
import { MovieParamDto } from './dto/param.dto';
import { NoAuth } from '../auth/decorator/no-auth.decorator';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({
  path: 'movies',
  version: '1',
})
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiTags('Movies')
  @Post()
  @Roles(Role.Admin)
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @ApiTags('Movies')
  @NoAuth()
  @Get()
  findAll(@Query() query: QueryDto) {
    return this.moviesService.findAll(query);
  }

  @ApiTags('Movies')
  @NoAuth()
  @Get(':movieId')
  findOne(@Param() movieParam: MovieParamDto) {
    return this.moviesService.findOne(+movieParam.movieId);
  }

  @ApiTags('Movies')
  @Patch(':movieId')
  @Roles(Role.Admin)
  update(
    @Param() movieParam: MovieParamDto,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.moviesService.update(
      +movieParam.movieId,
      updateMovieDto,
    );
  }

  @ApiTags('Movies')
  @Delete(':movieId')
  @Roles(Role.Admin)
  remove(@Param() movieParam: MovieParamDto) {
    return this.moviesService.remove(+movieParam.movieId);
  }

  @ApiTags('Tag Operations')
  @Post(':movieid/tags/:tagid')
  @Roles(Role.Admin)
  addTagToMovie(
    @Param('movieid') movieId: string,
    @Param('tagid') tagId: string,
  ) {
    return this.moviesService.addTag(+movieId, +tagId);
  }

  @ApiTags('Tag Operations')
  @Delete(':movieid/tags/:tagid')
  @Roles(Role.Admin)
  deleteTagFromMovie(
    @Param('movieid') movieId: string,
    @Param('tagid') tagId: string,
  ) {
    return this.moviesService.deleteTag(+movieId, +tagId);
  }
}
