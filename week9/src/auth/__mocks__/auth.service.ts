import {
  signInResponse,
  signOutResponse,
} from '../tests/stubs/auth.stub';

export const AuthService = jest.fn().mockReturnValue({
  signIn: jest.fn().mockResolvedValue(signInResponse()),
  signOut: jest.fn().mockResolvedValue(signOutResponse()),
});
