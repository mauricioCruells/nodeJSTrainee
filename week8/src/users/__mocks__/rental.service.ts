import { clientUserStub } from '../tests/stubs/user.stub';

export const RentalService = jest.fn().mockReturnValue({
  rentMovie: jest.fn().mockResolvedValue(clientUserStub()),
  returnMovie: jest.fn().mockResolvedValue(clientUserStub()),
  buyMovie: jest.fn().mockResolvedValue(clientUserStub()),
  findMyMovies: jest.fn().mockResolvedValue(clientUserStub()),
});
