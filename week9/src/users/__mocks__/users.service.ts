import {
  clientUserStub,
  updatedClientUserStub,
} from '../tests/stubs/user.stub';

export const UsersService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(clientUserStub()),
  findAll: jest.fn().mockResolvedValue([clientUserStub()]),
  findOne: jest.fn().mockResolvedValue(clientUserStub()),
  update: jest.fn().mockResolvedValue(updatedClientUserStub()),
  remove: jest.fn().mockResolvedValue(null),
});
