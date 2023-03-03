import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { updateUserStub, userStub } from './stubs/users.stub';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(userStub()),
            findAll: jest.fn().mockResolvedValue([userStub()]),
            findOne: jest.fn().mockResolvedValue(userStub()),
            update: jest.fn().mockResolvedValue(userStub()),
            remove: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('given findAll()', () => {
    describe('when it is called', () => {
      let users;

      beforeEach(async () => {
        users = await usersController.findAll({});
      });

      test('then userService.findAll should be called', () => {
        expect(usersService.findAll).toBeCalled();
      });

      test('then it should return an array of User', () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe('given findOne()', () => {
    describe('when it is called with id', () => {
      let user;

      beforeEach(async () => {
        user = await usersController.findOne('1');
      });

      test('then usersService.findOne should be called with number id', () => {
        expect(usersService.findOne).toBeCalled();
      });

      test('then it should return a User', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('given update()', () => {
    describe('when it is called with id and new info', () => {
      const userId = '1';
      const newInfo = updateUserStub();
      let user;

      beforeEach(async () => {
        user = await usersController.update(userId, newInfo);
      });

      test('then userService.update should be called', () => {
        expect(usersService.update).toBeCalled();
      });

      test('then it should return an updated user info', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('given remove()', () => {
    describe('when it is called with userId', () => {
      const userId = '1';
      beforeEach(async () => {
        await usersController.remove(userId);
      });

      test('then userService.remove should be called', () => {
        expect(usersService.remove).toBeCalled();
      });
    });
  });
});
