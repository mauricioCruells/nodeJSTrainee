import { Buys } from '../../../users/entities/buys.entity';
import { Rentals } from '../../../users/entities/rentals.entity';
import { Movie } from '../../../movies/entities/movie.entity';
import { tagStub } from './tags.stub';
import { CreateMovieDto } from '../../../movies/dto/create-movie.dto';
import { MovieParamDto } from '../../../movies/dto/param.dto';

export const movieStub = (): Movie => {
  return {
    movieId: 1,
    title: 'title',
    description: 'description',
    poster: 'www.poster.com',
    stock: 10,
    trailer: 'www.trailer.com',
    salePrice: 39.99,
    likes: 5,
    availability: 10,
    createdAt: new Date('2023-01-06T19:00:12.372Z'),
    updatedAt: new Date('2023-01-06T19:00:12.372Z'),
    tags: [tagStub()],
    rentals: [new Rentals()],
    buys: [new Buys()],
  };
};

export const sortNameMovieStub = (): Movie => {
  return {
    movieId: 1,
    title: 'title',
    description: 'description',
    poster: 'www.poster.com',
    stock: 10,
    trailer: 'www.trailer.com',
    salePrice: 39.99,
    likes: 5,
    availability: 10,
    createdAt: new Date('2023-01-06T19:00:12.372Z'),
    updatedAt: new Date('2023-01-06T19:00:12.372Z'),
    tags: [tagStub()],
    rentals: [new Rentals()],
    buys: [new Buys()],
  };
};

export const newMovieInfo = (): CreateMovieDto => {
  return {
    title: 'something',
    description: 'something',
    poster: 'some.url.com',
    stock: 10,
    availability: 10,
    trailer: 'some.url.com',
    salePrice: 10.99,
    likes: 1,
  };
};

export const movieIdParam = (): MovieParamDto => {
  return {
    movieId: 1,
  };
};
