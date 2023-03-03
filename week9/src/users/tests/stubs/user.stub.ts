import { JwtInfo } from 'src/auth/interfaces/jwtinfo.type';
import { ParamDto } from '../../dto/param.dto';
import { Buys } from '../../entities/buys.entity';
import { Rentals } from '../../entities/rentals.entity';
import { User } from '../../entities/user.entity';

export const clientUserStub = (): User => {
  return {
    userId: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    createdAt: new Date('2023-01-06T05:21:28.056Z'),
    updatedAt: new Date('2023-01-06T05:21:28.056Z'),
    isLoggedIn: true,
    username: 'something',
    password: 'something',
    role: 'admin',
    lastLogin: new Date('2023-01-06T05:21:28.056Z'),
    rentals: [new Rentals()],
    buys: [new Buys()],
  };
};

export const testParamDto = (): ParamDto => {
  return {
    userId: 1,
  };
};

export const updatedClientUserStub = (): User => {
  return {
    userId: 1,
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'Jane.doe@example.com',
    createdAt: new Date('2023-01-06T05:21:28.056Z'),
    updatedAt: new Date('2023-01-06T05:22:42.374Z'),
    isLoggedIn: true,
    username: 'something',
    password: 'something',
    role: 'admin',
    lastLogin: new Date('2023-01-06T05:21:28.056Z'),
    rentals: [new Rentals()],
    buys: [new Buys()],
  };
};

export const userJWT = (): JwtInfo => {
  return {
    sub: 1,
    iat: 1,
    exp: 1,
  };
};
