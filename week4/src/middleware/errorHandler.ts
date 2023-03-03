import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomAPIError from '../errors/CustomAPI';

const errorHandlerMiddleware = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomAPIError) {
    res.status(err.statusCode).json({ error: err.name, msg: err.message });
  } else if (err.name === 'ValidationError') {
    console.log(err.name, err.message);
    res.status(StatusCodes.BAD_REQUEST).json({
      error: err.name,
      msg: 'Request body is missing a field or has invalid types, please check console for further details.',
    });
  } else if (err.name === 'SyntaxError') {
    console.log(err.name, err.message);
    res.status(StatusCodes.BAD_REQUEST).json({
      error: err.name,
      msg: 'Invalid syntax in request body, please check console for further details.',
    });
  } else {
    // unhandled exceptions show on console only for development
    if (process.env.NODE_ENV === 'development') {
      console.log(err.name, err.stack);
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'ServerError',
      msg: 'Something went wrong, please try again',
    });
  }
  return next();
};

export default errorHandlerMiddleware;
