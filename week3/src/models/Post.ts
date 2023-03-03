import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a post title'],
      maxlength: 50,
    },
    body: {
      type: String,
      required: [true, 'Please provide the post content'],
      maxlength: 300,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Post', PostSchema);
