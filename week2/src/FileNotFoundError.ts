export class FileNotFoundError extends Error {
  constructor(message: string | undefined) {
    super(message);
  }
}