import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'Please provide a post title'],
      maxlength: 50,
    },
    belongsToPost: {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
      required: [true, 'Please provide a blog post for this comment'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Comment', CommentSchema);
