import http from 'http';

type NodeResponse = http.ServerResponse<http.IncomingMessage> & {
  req: http.IncomingMessage;
};

export function routeNotFound(res: NodeResponse) {
  res.writeHead(404, { 'Content-Type': 'application / vnd.api + json' });
  res.end(
    JSON.stringify({
      message: 'Route Not Found: Please use the api/v1/blog or api/v1/comment endpoints',
    })
  );
}

export function methodNotImplemented(res: NodeResponse, method: string) {
  res.writeHead(404, { 'Content-Type': 'application / vnd.api + json' });
  res.end(
    JSON.stringify({
      message: `Method: ${method} not implemented for this route`,
    })
  );
}
