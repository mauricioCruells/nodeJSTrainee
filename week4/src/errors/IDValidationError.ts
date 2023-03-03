import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './CustomAPI';

class IDValidationError extends CustomAPIError {
  constructor(message: string) {
    super(message, 'ValidationError', StatusCodes.BAD_REQUEST);
  }
}

export default IDValidationError;
