/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import NotFoundError from '../errors/NotFoundError';

const notFound = (req: Request, _res: Response, next: NextFunction) => {
  const error = new NotFoundError(
    `${req.url} is not a valid endpoint for this API, try:\n /api/v1/posts for blog posts operations\n /api/v1/comments for blog post's comments operations`
  );

  next(error);
};

export default notFound;
