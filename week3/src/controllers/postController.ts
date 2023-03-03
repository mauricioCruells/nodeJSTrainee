import http from 'http';
import Post from '../models/Post';
import getPostData from '../helpers/postData';

type NodeRequest = http.IncomingMessage;
type NodeResponse = http.ServerResponse<http.IncomingMessage> & {
  req: http.IncomingMessage;
};

export async function getAllBlogPost(res: NodeResponse) {
  const posts = await Post.find({}).sort('createdAt');
  res.writeHead(200, { 'Content-Type': 'application / vnd.api + json' });
  res.end(JSON.stringify(posts));
}

export async function getBlogPost(res: NodeResponse, id: string) {
  const post = await Post.findById(id);
  if (post) {
    res.writeHead(200, { 'Content-Type': 'application / vnd.api + json' });
    res.end(JSON.stringify(post));
  } else {
    res.writeHead(404, { 'Content-Type': 'application / vnd.api + json' });
    res.end(JSON.stringify({ message: `No post with id: ${id} found` }));
  }
}

export async function createBlogPost(req: NodeRequest, res: NodeResponse) {
  const body = await getPostData(req);

  if (typeof body === 'string') {
    const post = await Post.create(JSON.parse(body));
    res.writeHead(200, { 'Content-Type': 'application / vnd.api + json' });
    res.end(JSON.stringify(post));
  }
}

export async function deleteBlogPost(res: NodeResponse, id: string) {
  const post = await Post.findByIdAndRemove(id);

  if (post) {
    res.writeHead(200, { 'Content-Type': 'application / vnd.api + json' });
    res.end(
      JSON.stringify({
        message: `successfully deleted post with id: ${id}`,
      })
    );
  } else {
    res.writeHead(404, { 'Content-Type': 'application / vnd.api + json' });
    res.end(
      JSON.stringify({
        message: `No post with id: ${id} found`,
      })
    );
  }
}
