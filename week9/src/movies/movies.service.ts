import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { QueryDto } from './dto/query.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MovieRepository } from './repositories/movie.repository';
import { TagsService } from './tags.service';
import {
  parseFilterParams,
  parseSortParams,
} from './utils/query.util';

@Injectable()
export class MoviesService {
  constructor(
    private movieRepository: MovieRepository,
    private tagsService: TagsService,
  ) {}

  create(newMovieInfo: CreateMovieDto) {
    return this.movieRepository.createOneMovie(newMovieInfo);
  }

  findAll(query: QueryDto) {
    const { sort, ...filters } = query;
    let filterOptions = {};
    let sortOptions = {};

    filterOptions = parseFilterParams(filters);

    sortOptions = parseSortParams(sort);

    return this.movieRepository.findAllMovies(
      filterOptions,
      sortOptions,
    );
  }

  async findOne(movieId: number): Promise<Movie> {
    const movie = await this.movieRepository.findOneMovie(movieId);

    if (!movie) {
      throw new NotFoundException(
        `movie with id: ${movieId} not found`,
      );
    }

    return movie;
  }

  async update(movieId: number, updatedMovieInfo: UpdateMovieDto) {
    const movie = await this.findOne(movieId);

    await this.movieRepository.updateOneMovie(
      movie,
      updatedMovieInfo,
    );

    return {
      movieId,
      update: {
        ...updatedMovieInfo,
      },
    };
  }

  async remove(movieId: number) {
    const deletedMovie = await this.movieRepository.deleteOneMovie(
      movieId,
    );

    if (deletedMovie.affected === 0) {
      throw new NotFoundException(
        `movie with id: ${movieId} not found`,
      );
    }
  }

  async addTag(movieId: number, tagId: number) {
    const movie = await this.findOne(movieId);

    const tag = await this.tagsService.findOne(tagId);

    return this.movieRepository.addOneTag(movie, tag);
  }

  async deleteTag(movieId: number, tagId: number) {
    const movie = await this.findOne(movieId);

    const tag = await this.tagsService.findOne(tagId);

    return this.movieRepository.deleteOneTag(movie, tag);
  }
}
