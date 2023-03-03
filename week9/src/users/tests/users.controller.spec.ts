import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../entities/user.entity';
import { RentalService } from '../rental.service';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { query } from './stubs/query.stub';
import {
  clientUserStub,
  testParamDto,
  updatedClientUserStub,
  userJWT,
} from './stubs/user.stub';

jest.mock('../users.service');
jest.mock('../rental.service');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let rentalService: RentalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, RentalService],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    rentalService = module.get<RentalService>(RentalService);

    jest.clearAllMocks();
  });

  describe('given findAll()', () => {
    describe('when it is called', () => {
      let users: User[];

      beforeEach(async () => {
        users = await usersController.findAll();
      });

      test('then userService.findAll should be called', () => {
        expect(usersService.findAll).toBeCalled();
      });

      test('then it should return an array of User', () => {
        expect(users).toEqual([clientUserStub()]);
      });
    });
  });

  describe('given findOne()', () => {
    describe('when it is called with id', () => {
      let user: User;

      beforeEach(async () => {
        user = await usersController.findOne(testParamDto());
      });

      test('then usersService.findOne should be called with number id', () => {
        expect(usersService.findOne).toBeCalledWith(
          clientUserStub().userId,
        );
      });

      test('then it should return a User', () => {
        expect(user).toEqual(clientUserStub());
      });
    });
  });

  describe('given update()', () => {
    describe('when it is called with id and new info', () => {
      const userId = testParamDto();
      const newInfo = updatedClientUserStub();
      let user;

      beforeEach(async () => {
        user = await usersController.update(userId, newInfo);
      });

      test('then userService.update should be called', () => {
        expect(usersService.update).toBeCalled();
      });

      test('then it should return an updated user info', () => {
        expect(user).toEqual(updatedClientUserStub());
      });
    });
  });

  describe('given remove()', () => {
    describe('when it is called with userId', () => {
      beforeEach(async () => {
        await usersController.remove(testParamDto());
      });

      test('then userService.remove should be called', () => {
        expect(usersService.remove).toBeCalled();
      });
    });
  });

  describe('given findMyRentals()', () => {
    describe('when called with userInfo from jwt', () => {
      let user: User;
      beforeEach(async () => {
        user = await usersController.findMyRentals(userJWT());
      });

      test('then rentalService.findMyMovies should be called', () => {
        expect(rentalService.findMyMovies).toBeCalled();
      });

      test('then it should return the user with the transactions', () => {
        expect(user).toEqual(clientUserStub());
      });
    });
  });

  describe('given rentMovie()', () => {
    describe('when called with userInfo and movies param', () => {
      let user: User;
      beforeEach(async () => {
        user = await rentalService.rentMovie(userJWT(), query());
      });

      test('then rentalService.rentMovie should be called', () => {
        expect(rentalService.rentMovie).toBeCalled();
      });

      test('then it should return a user with rentals', () => {
        expect(user).toEqual(clientUserStub());
      });
    });
  });

  describe('given buymovie()', () => {
    describe('when called with userInfo and movies param', () => {
      let user: User;
      beforeEach(async () => {
        user = await rentalService.buyMovie(userJWT(), query());
      });

      test('then rentalService.buyMovie should be called', () => {
        expect(rentalService.buyMovie).toBeCalled();
      });

      test('then it should return a user with buys', () => {
        expect(user).toEqual(clientUserStub());
      });
    });
  });

  describe('given returnMovie()', () => {
    describe('when called with userInfo and movieId', () => {
      const movieId = 1;
      let user: User;
      beforeEach(async () => {
        user = await rentalService.returnMovie(userJWT(), movieId);
      });

      test('then rentalService.returnMovie should be called', () => {
        expect(rentalService.returnMovie).toBeCalled();
      });

      test('then it should return a user with rentals and buys', () => {
        expect(user).toEqual(clientUserStub());
      });
    });
  });
});
