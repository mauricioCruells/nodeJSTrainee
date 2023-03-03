import http from 'http';

export default function getPostData(req: http.IncomingMessage) {
  return new Promise((resolve, reject) => {
    try {
      let body = '';

      req.on('data', (chunk: Buffer) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}
