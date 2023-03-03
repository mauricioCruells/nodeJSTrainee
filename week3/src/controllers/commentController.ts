import http from 'http';
import Comment from '../models/Comment';
import getPostData from '../helpers/postData';

type NodeRequest = http.IncomingMessage;
type NodeResponse = http.ServerResponse<http.IncomingMessage> & {
  req: http.IncomingMessage;
};

export async function getAllComments(res: NodeResponse) {
  const comment = await Comment.find({}).sort('createdAt');
  res.writeHead(200, { 'Content-Type': 'application / vnd.api + json' });
  res.end(JSON.stringify(comment));
}

export async function getComment(res: NodeResponse, id: string) {
  const comment = await Comment.findById(id);
  if (comment) {
    res.writeHead(200, { 'Content-Type': 'application / vnd.api + json' });
    res.end(JSON.stringify(comment));
  } else {
    res.writeHead(404, { 'Content-Type': 'application / vnd.api + json' });
    res.end(JSON.stringify({ message: `No comment with id: ${id} found` }));
  }
}

export async function createComment(req: NodeRequest, res: NodeResponse) {
  const body = await getPostData(req);

  if (typeof body === 'string') {
    const comment = await Comment.create(JSON.parse(body));
    res.writeHead(200, { 'Content-Type': 'application / vnd.api + json' });
    res.end(JSON.stringify(comment));
  }
}

export async function deleteComment(res: NodeResponse, id: string) {
  const comment = await Comment.findByIdAndRemove(id);

  if (comment) {
    res.writeHead(200, { 'Content-Type': 'application / vnd.api + json' });
    res.end(
      JSON.stringify({
        message: `successfully deleted comment with id: ${id}`,
      })
    );
  } else {
    res.writeHead(404, { 'Content-Type': 'application / vnd.api + json' });
    res.end(
      JSON.stringify({
        message: `No comment with id: ${id} found`,
      })
    );
  }
}
