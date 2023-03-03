import { movieStub } from '../tests/stubs/movies.stub';

export const MoviesService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([movieStub()]),
  create: jest.fn().mockResolvedValue(movieStub()),
  findOne: jest.fn().mockResolvedValue(movieStub()),
  update: jest.fn().mockResolvedValue(movieStub()),
  remove: jest.fn().mockResolvedValue(null),
  addTag: jest.fn().mockResolvedValue(movieStub()),
  deleteTag: jest.fn().mockResolvedValue(movieStub()),
});
