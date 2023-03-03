/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { NextFunction, Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { StatusCodes } from 'http-status-codes';
import pool from '../db/db';
import { validatePostData } from '../utils/validations';
import NotFoundError from '../errors/NotFoundError';
import IDValidationError from '../errors/IDValidationError';

export const getAllPosts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const allPosts = await pool.query('SELECT * FROM posts ORDER BY created_at;');
    res.status(StatusCodes.OK).json({
      data: allPosts.rows,
    });
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.params.id.length !== 21) {
      throw new IDValidationError(`Id: ${req.params.id} is not a valid id, please retry`);
    }

    const post = await pool.query('SELECT * FROM posts WHERE id=$1;', [req.params.id]);

    if (post.rowCount !== 0) {
      res.status(StatusCodes.OK).json({ data: post.rows });
    } else {
      throw new NotFoundError(`Post with id: ${req.params.id} not found`);
    }
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    validatePostData(req.body);
    const user = '390SJte3AshKfDwcpt-h_';
    const { author, title, content } = req.body;

    const post = await pool.query(
      'INSERT INTO posts (id, user_id, author, title, content, created_at) VALUES ($1, $2, $3, $4, $5, current_timestamp) RETURNING *;',
      [nanoid(), user, author, title, content]
    );

    if ('tags' in req.body) {
      const { tags } = req.body;
      const postId: string = post.rows[0].id;
      const insertedTags = await pool.query(
        'INSERT INTO tags (post_id, tags) VALUES ($1, $2) RETURNING *;',
        [postId, tags]
      );
      res.status(StatusCodes.CREATED).json({ data: { post: post.rows, tags: insertedTags.rows } });
    }

    res.status(StatusCodes.CREATED).json({ data: post.rows });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.params.id.length !== 21) {
      throw new IDValidationError(`Id: ${req.params.id} is not a valid id, please retry`);
    }

    validatePostData(req.body);
    const { author, title, content } = req.body;
    const post = await pool.query(
      'UPDATE posts SET author = $1, title = $2, content = $3 WHERE id = $4;',
      [author, title, content, req.params.id]
    );
    if (post.rowCount === 1) {
      res.status(StatusCodes.OK).json({
        message: `Succesfully updated post with id: ${req.params.id} `,
        data: [req.body],
      });
    } else {
      throw new NotFoundError(`Post with id: ${req.params.id} not found`);
    }
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.params.id.length !== 21) {
      throw new IDValidationError(`Id: ${req.params.id} is not a valid id, please retry`);
    }

    const post = await pool.query('DELETE FROM posts WHERE id = $1', [req.params.id]);
    if (post.rowCount === 1) {
      res.status(StatusCodes.OK).json({
        message: `Succesfully deleted post with id: ${req.params.id} `,
      });
    } else {
      throw new NotFoundError(`Post with id: ${req.params.id} not found`);
    }
  } catch (error) {
    next(error);
  }
};
