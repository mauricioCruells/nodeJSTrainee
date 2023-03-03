import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './CustomAPI';

class NotFoundError extends CustomAPIError {
  constructor(message: string) {
    super(message, 'NotFound', StatusCodes.NOT_FOUND);
  }
}

export default NotFoundError;
