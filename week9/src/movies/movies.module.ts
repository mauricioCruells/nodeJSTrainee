import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { Movie } from './entities/movie.entity';
import { Tag } from './entities/tag.entity';
import { MovieRepository } from './repositories/movie.repository';
import { TagRepository } from './repositories/tag.repository';
import { Rentals } from '../users/entities/rentals.entity';
import { Buys } from '../users/entities/buys.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Tag, Rentals, Buys])],
  controllers: [MoviesController, TagsController],
  providers: [
    MoviesService,
    MovieRepository,
    TagsService,
    TagRepository,
  ],
  exports: [
    MoviesService,
    MovieRepository,
    TagRepository,
    TagsService,
  ],
})
export class MoviesModule {}
