import express from 'express';
import {
  getAllComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} from '../controllers/blogComments';

const router = express.Router();
router.route('/').get(getAllComments).post(createComment);
router.route('/:id').get(getComment).put(updateComment).delete(deleteComment);

export default router;
