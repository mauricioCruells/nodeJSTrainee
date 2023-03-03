import Joi from 'joi';

export const validatePostData = (post: object) => {
  const postSchema = Joi.object({
    author: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
    tags: Joi.string(),
  });

  return Joi.assert(post, postSchema);
};

export const validateCommentData = (comment: object) => {
  const commentSchema = Joi.object({
    postId: Joi.string().required(),
    userId: Joi.string().required(),
    content: Joi.string().required(),
    likes: Joi.number(),
  });

  return Joi.assert(comment, commentSchema);
};
