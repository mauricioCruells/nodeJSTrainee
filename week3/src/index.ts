/* eslint-disable @typescript-eslint/no-floating-promises */
import http from 'http';
import dotenv from 'dotenv';
import { routeNotFound, methodNotImplemented } from './helpers/notFound';
import {
  getAllBlogPost,
  createBlogPost,
  getBlogPost,
  deleteBlogPost,
} from './controllers/postController';
import {
  getAllComments,
  createComment,
  getComment,
  deleteComment,
} from './controllers/commentController';
import connectDB from './db/connect';

dotenv.config();
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (typeof url === 'string' && typeof method === 'string') {
    if (url.match(/\/api\/v1\/blog\/?$/)) {
      if (method === 'GET') {
        getAllBlogPost(res);
      } else if (method === 'POST') {
        createBlogPost(req, res);
      } else {
        methodNotImplemented(res, method);
      }
    } else if (url.match(/\/api\/v1\/blog\/\w+/)) {
      const id = url.split('/')[4];
      if (method === 'GET') {
        getBlogPost(res, id);
      } else if (method === 'DELETE') {
        deleteBlogPost(res, id);
      } else {
        methodNotImplemented(res, method);
      }
    } else if (url.match(/\/api\/v1\/comment\/?$/)) {
      if (method === 'GET') {
        getAllComments(res);
      } else if (method === 'POST') {
        createComment(req, res);
      } else {
        methodNotImplemented(res, method);
      }
    } else if (url.match(/\/api\/v1\/comment\/\w+/)) {
      const id = url.split('/')[4];
      if (method === 'GET') {
        getComment(res, id);
      } else if (method === 'DELETE') {
        deleteComment(res, id);
      } else {
        methodNotImplemented(res, method);
      }
    } else {
      routeNotFound(res);
    }
  }
});

const main = async () => {
  try {
    await connectDB(`${process.env.MONGO_URI}`);
    console.log('Connected to mongoDB...');
    server.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

void main();
