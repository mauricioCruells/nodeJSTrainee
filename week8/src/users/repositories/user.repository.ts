import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Movie } from '../../movies/entities/movie.entity';
import { MoviesService } from 'src/movies/movies.service';
import { Rentals } from '../entities/rentals.entity';
import { Buys } from '../entities/buys.entity';
import { DataSource, Repository } from 'typeorm';
import { Errors } from 'src/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { RentalsRepository } from './rental.repository';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    private dataSource: DataSource,
    private moviesService: MoviesService,
    private rentalsRepository: RentalsRepository,
    private mailService: MailService,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async findAllUsers(): Promise<User[]> {
    return this.find({
      relations: { rentals: true, buys: true },
    });
  }

  async findOneUser(userId: number): Promise<User> {
    return this.findOne({
      where: { userId },
      relations: { rentals: true, buys: true },
    });
  }

  async findOneUserByUsername(username: string): Promise<User> {
    return this.findOne({
      where: { username },
      relations: { rentals: true, buys: true },
    });
  }

  async findOneUserByEmail(email: string): Promise<User> {
    return this.findOne({
      where: { email },
      relations: { rentals: true, buys: true },
    });
  }

  async createOneUser(
    userInfoWithHash: CreateUserDto,
  ): Promise<User> {
    try {
      return this.save(userInfoWithHash);
    } catch (error) {
      if (+error.code === Errors.DuplicateError) {
        throw new ConflictException(error.detail);
      } else {
        throw new Error(error);
      }
    }
  }

  async updateOneUser(user: User, updatedUserInfo: UpdateUserDto) {
    return this.update(user.userId, { ...updatedUserInfo });
  }

  async deleteOneUser(userId: number) {
    return this.delete(userId);
  }

  /***********************MOVIE USER METHODS****************************/

  async rentMovies(user: User, movies: Movie[]) {
    const emailRentals = [];

    console.log(emailRentals);
    //create rentals
    const rentals: Rentals[] = movies.map((movie) => {
      const rental = new Rentals();
      rental.movie = movie;

      const returnTime = new Date();
      returnTime.setDate(returnTime.getDate() + 7);

      rental.returnDate = returnTime;

      emailRentals.push({
        title: movie.title,
        returnDate: returnTime,
      });

      return rental;
    });

    //save user with rentals
    user.rentals.push(...rentals);
    await this.save(user);

    //update movies
    movies.map(async (movie) => {
      movie.availability -= 1;
      await this.moviesService.update(movie.movieId, {
        availability: movie.availability,
      });
    });

    //create email information
    await this.mailService.sendRentalReceipt(user, emailRentals);

    return user;
  }

  async returnOneMovie(user: User, movie: Movie): Promise<User> {
    const rental = user.rentals.find((rental) => {
      return rental.movie.movieId === movie.movieId;
    });

    if (rental) {
      movie.availability += 1;

      await this.moviesService.update(movie.movieId, {
        availability: movie.availability,
      });

      user.rentals = user.rentals.filter(
        (rental) => rental.movie.movieId !== movie.movieId,
      );

      await this.rentalsRepository.deleteRental(rental.rentalId);
    }

    return this.save(user);
  }

  async buyMovies(user: User, movies: Movie[]) {
    const emailBuys = { buys: [], total: 0 };

    //create buys
    const buys: Buys[] = movies.map((movie) => {
      const buy = new Buys();
      buy.movie = movie;
      buy.soldAt = new Date();

      emailBuys.total = emailBuys.total + movie.salePrice;

      emailBuys.buys.push({
        title: movie.title,
        price: movie.salePrice,
      });

      return buy;
    });

    //save user with buys
    user.buys.push(...buys);
    await this.save(user);

    //update movies
    movies.map(async (movie) => {
      movie.stock -= 1;
      movie.availability -= 1;
      await this.moviesService.update(movie.movieId, {
        stock: movie.stock,
        availability: movie.availability,
      });
    });

    //create email information
    await this.mailService.sendBuyReceipt(user, emailBuys);

    return user;
  }

  async findMyMovies(user: User): Promise<User> {
    return this.findOne({
      where: { userId: user.userId },
      select: {
        rentals: {
          rentalId: true,
          movie: { movieId: true, title: true },
          returnDate: true,
        },
        buys: {
          buyId: true,
          movie: { movieId: true, title: true },
          soldAt: true,
        },
      },
      relations: {
        rentals: { movie: true },
        buys: { movie: true },
      },
    });
  }

  /***********************AUTH USER METHODS****************************/

  async updatedLoggedInStatus(user: User, state: boolean) {
    await this.update(user.userId, {
      isLoggedIn: state,
      lastLogin: new Date(),
    });
  }

  async updateRole(user: User, newRole: string) {
    user.role = newRole;
    return this.save(user);
  }
}
