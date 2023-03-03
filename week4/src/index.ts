import 'dotenv/config';
import express, { Express } from 'express';
import blogPostsRouter from './routes/blogPosts';
import blogCommentsRouter from './routes/blogComments';
import notFoundMiddleware from './middleware/notFound';
import errorHandlerMiddleware from './middleware/errorHandler';

const port = process.env.PORT || 3000;
const app: Express = express();
app.use(express.json());

app.use('/api/v1/posts', blogPostsRouter);
app.use('/api/v1/comments', blogCommentsRouter);
app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
