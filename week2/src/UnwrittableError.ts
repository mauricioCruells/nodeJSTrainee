export class UnwrittableError extends Error {
  constructor(message: string | undefined) {
    super(message);
  }
}