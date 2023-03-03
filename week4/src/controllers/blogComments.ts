/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { NextFunction, Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { StatusCodes } from 'http-status-codes';
import pool from '../db/db';
import { validateCommentData } from '../utils/validations';
import NotFoundError from '../errors/NotFoundError';
import IDValidationError from '../errors/IDValidationError';

const userIdTemp = '390SJte3AshKfDwcpt-h_';

export const getAllComments = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const allComments = await pool.query(
      'SELECT * FROM comments WHERE user_id = $1 ORDER BY created_at ;',
      [userIdTemp]
    );
    res.status(StatusCodes.OK).json({
      data: allComments.rows,
    });
  } catch (error) {
    next(error);
  }
};

export const getComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.params.id.length !== 21) {
      throw new IDValidationError(`Id: ${req.params.id} is not a valid id, please retry`);
    }

    const comment = await pool.query('SELECT * FROM comments WHERE id=$1;', [req.params.id]);

    if (comment.rowCount !== 0) {
      res.status(StatusCodes.OK).json({ data: comment.rows });
    } else {
      throw new NotFoundError(`Comment with id: ${req.params.id} not found`);
    }
  } catch (error) {
    next(error);
  }
};

export const createComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validateCommentData(req.body);
    const { postId, userId, content } = req.body;

    const comment = await pool.query(
      'INSERT INTO comments (id, post_id, user_id, comment, likes, created_at) VALUES ($1, $2, $3, $4, $5, current_timestamp) RETURNING *;',
      [nanoid(), postId, userId, content, 0]
    );
    res.status(StatusCodes.CREATED).json({ data: comment.rows });
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.params.id.length !== 21) {
      throw new IDValidationError(`Id: ${req.params.id} is not a valid id, please retry`);
    }

    validateCommentData(req.body);
    const { content } = req.body;
    const post = await pool.query('UPDATE comments SET comment = $1 WHERE id = $2;', [
      content,
      req.params.id,
    ]);
    if (post.rowCount === 1) {
      res.status(StatusCodes.OK).json({
        message: `Succesfully updated comment with id: ${req.params.id} `,
        data: [req.body],
      });
    } else {
      throw new NotFoundError(`Comment with id: ${req.params.id} not found`);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.params.id.length !== 21) {
      throw new IDValidationError(`Id: ${req.params.id} is not a valid id, please retry`);
    }

    const comment = await pool.query('DELETE FROM comments WHERE id = $1', [req.params.id]);
    if (comment.rowCount === 1) {
      res.status(StatusCodes.OK).json({
        message: `Succesfully deleted comment with id: ${req.params.id} `,
      });
    } else {
      throw new NotFoundError(`Comment with id: ${req.params.id} not found`);
    }
  } catch (error) {
    next(error);
  }
};
