import { Injectable } from '@nestjs/common';
import { JwtInfo } from 'src/auth/interfaces/jwtinfo.type';
import { UserRepository } from './repositories/user.repository';
import { UsersService } from './users.service';
import { MoviesService } from 'src/movies/movies.service';
import { QueryDto } from 'src/movies/dto/query.dto';
import { User } from './entities/user.entity';

@Injectable()
export class RentalService {
  constructor(
    private userRepository: UserRepository,
    private usersService: UsersService,
    private moviesService: MoviesService,
  ) {}

  async rentMovie(userInfo: JwtInfo, query: QueryDto) {
    // only movies that are avaiable will be returned
    const movies = await this.moviesService.findAll(query);

    const user = await this.usersService.findOne(userInfo.sub);

    return this.userRepository.rentMovies(user, movies);
  }

  async returnMovie(
    userInfo: JwtInfo,
    movieId: number,
  ): Promise<User> {
    const movie = await this.moviesService.findOne(movieId);

    const user = await this.findMyMovies(userInfo);

    return this.userRepository.returnOneMovie(user, movie);
  }

  async buyMovie(userInfo: JwtInfo, query: QueryDto) {
    const movies = await this.moviesService.findAll(query);

    const user = await this.usersService.findOne(userInfo.sub);

    return this.userRepository.buyMovies(user, movies);
  }

  async findMyMovies(userInfo: JwtInfo): Promise<User> {
    const user = await this.usersService.findOne(userInfo.sub);

    return this.userRepository.findMyMovies(user);
  }
}
