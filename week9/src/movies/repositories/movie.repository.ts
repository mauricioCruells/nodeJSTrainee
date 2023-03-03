import { ConflictException, Injectable } from '@nestjs/common';
import { Errors } from '../../common';
import { DataSource, Repository } from 'typeorm';
import { TagRepository } from '../repositories/tag.repository';
import { Movie } from '../entities/movie.entity';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { Tag } from '../entities/tag.entity';

@Injectable()
export class MovieRepository extends Repository<Movie> {
  constructor(
    private dataSource: DataSource,
    private tagRepository: TagRepository,
  ) {
    super(Movie, dataSource.createEntityManager());
  }

  async createOneMovie(movieInfo: CreateMovieDto) {
    try {
      return this.save(movieInfo);
    } catch (error) {
      if (+error.code === Errors.DuplicateError) {
        throw new ConflictException(error.detail);
      } else {
        throw new Error(error);
      }
    }
  }

  async findAllMovies(filterOptions, sortOptions): Promise<Movie[]> {
    return this.find({
      where: filterOptions,
      order: sortOptions,
      relations: { tags: true },
    });
  }

  async findOneMovie(movieId: number): Promise<Movie> {
    return this.findOne({
      where: { movieId },
      relations: { tags: true },
    });
  }

  async updateOneMovie(
    movie: Movie,
    updatedMovieInfo: UpdateMovieDto,
  ) {
    return this.update(movie.movieId, { ...updatedMovieInfo });
  }

  async deleteOneMovie(id: number) {
    return this.delete(id);
  }

  async addOneTag(movie: Movie, tag: Tag) {
    movie.tags.push(tag);
    return this.save(movie);
  }

  async deleteOneTag(movie: Movie, tag: Tag) {
    movie.tags = movie.tags.filter(
      (currentTag) => currentTag.tagId !== tag.tagId,
    );
    return this.save(movie);
  }
}
