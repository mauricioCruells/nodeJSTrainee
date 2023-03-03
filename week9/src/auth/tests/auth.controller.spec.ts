import { Test, TestingModule } from '@nestjs/testing';
import { userJWT } from '../../users/tests/stubs/user.stub';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import {
  credentials,
  signInResponse,
  signOutResponse,
} from './stubs/auth.stub';

jest.mock('../auth.service');

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  test('module should be defined', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('given signIn()', () => {
    describe('when called with credentials', () => {
      let response;

      beforeEach(async () => {
        response = await authController.signIn(credentials());
      });

      test('then it should call authService.signIn', () => {
        expect(authService.signIn).toBeCalled();
      });

      test('then it should return response with token', () => {
        expect(response).toEqual(signInResponse());
      });
    });
  });

  describe('given signOut()', () => {
    describe('when called', () => {
      let response;

      beforeEach(async () => {
        response = await authController.signOut(userJWT());
      });

      test('then it should call authService.signOut', () => {
        expect(authService.signOut).toBeCalled();
      });

      test('then it should return response', () => {
        expect(response).toEqual(signOutResponse());
      });
    });
  });
});
