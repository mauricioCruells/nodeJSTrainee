import { Test, TestingModule } from '@nestjs/testing';
import { query } from '../../users/tests/stubs/query.stub';
import { Movie } from '../entities/movie.entity';
import { MoviesController } from '../movies.controller';
import { MoviesService } from '../movies.service';
import {
  movieIdParam,
  movieStub,
  newMovieInfo,
} from './stubs/movies.stub';

jest.mock('../movies.service');

describe('MoviesController', () => {
  let moviesController: MoviesController;
  let moviesService: MoviesService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService],
    }).compile();

    moviesController = module.get<MoviesController>(MoviesController);
    moviesService = module.get<MoviesService>(MoviesService);
  });

  test('module should be defined', () => {
    expect(moviesController).toBeDefined();
    expect(moviesService).toBeDefined();
  });

  describe('given findAll()', () => {
    describe('when called with sort and filter params', () => {
      let movies: Movie[];

      beforeEach(async () => {
        movies = await moviesController.findAll(query());
      });

      test('then it should call moviesService.findAll', () => {
        expect(moviesService.findAll).toBeCalled();
      });

      test('then it should return an array of movies', () => {
        expect(movies).toEqual([movieStub()]);
      });
    });
  });

  describe('given create()', () => {
    describe('when called with new movie info', () => {
      let movie: Movie;
      beforeEach(async () => {
        movie = await moviesController.create(newMovieInfo());
      });

      test('then it should call moviesService.create', () => {
        expect(moviesService.create).toBeCalled();
      });

      test('then it should return created movie', () => {
        expect(movie).toEqual(movieStub());
      });
    });
  });

  describe('given findOne()', () => {
    describe('when called with movieId', () => {
      let movie: Movie;
      beforeEach(async () => {
        movie = await moviesController.findOne(movieIdParam());
      });

      test('then it should call moviesService.findOne', () => {
        expect(moviesService.findOne).toBeCalled;
      });

      test('then it should return movie', () => {
        expect(movie).toEqual(movieStub());
      });
    });
  });

  describe('given update()', () => {
    describe('when called with movieId and new info', () => {
      let movie;
      beforeEach(async () => {
        movie = await moviesController.update(
          movieIdParam(),
          movieStub(),
        );
      });

      test('then it should call moviesService.update', () => {
        expect(moviesService.update).toBeCalled;
      });

      test('then it should return movie', () => {
        expect(movie).toEqual(movieStub());
      });
    });
  });

  describe('given remove()', () => {
    describe('when called with movieid', () => {
      beforeEach(async () => {
        await moviesController.remove(movieIdParam());
      });

      test('then it should call moviesService.remove', () => {
        expect(moviesService.remove).toBeCalled();
      });
    });
  });

  describe('given addTagToMovie()', () => {
    describe('when called with movie and tag id', () => {
      let movie: Movie;
      const movieId = 1;
      const tagId = 1;
      beforeEach(async () => {
        movie = await moviesService.addTag(movieId, tagId);
      });

      test('then moviesService.addTag should be called', () => {
        expect(moviesService.addTag).toBeCalled();
      });

      test('then it should return a movie with tags', () => {
        expect(movie).toEqual(movieStub());
      });
    });
  });

  describe('given deleteTagFromMovie()', () => {
    describe('when called with movie and tag id', () => {
      let movie: Movie;
      const movieId = 1;
      const tagId = 1;
      beforeEach(async () => {
        movie = await moviesService.deleteTag(movieId, tagId);
      });

      test('then moviesService.deleteTag should be called', () => {
        expect(moviesService.deleteTag).toBeCalled();
      });

      test('then it should return a movie with tags', () => {
        expect(movie).toEqual(movieStub());
      });
    });
  });
});
