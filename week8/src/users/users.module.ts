import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { Movie } from '../movies/entities/movie.entity';
import { Tag } from '../movies/entities/tag.entity';
import { RentalService } from './rental.service';
import { MoviesModule } from '../movies/movies.module';
import { RentalsRepository } from './repositories/rental.repository';
import { Rentals } from './entities/rentals.entity';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Movie, Tag, Rentals]),
    MoviesModule,
    MailModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    RentalService,
    RentalsRepository,
  ],
  exports: [UsersService, UserRepository, RentalService],
})
export class UsersModule {}
