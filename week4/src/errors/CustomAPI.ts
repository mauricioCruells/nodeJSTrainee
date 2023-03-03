class CustomAPIError extends Error {
  constructor(message: string, public name: string, public statusCode: number) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}

export default CustomAPIError;
