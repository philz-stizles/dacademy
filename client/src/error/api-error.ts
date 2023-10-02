class ApiError extends Error {
  readonly statusCode: number;
  constructor(message: string, statusCode: number) {
    // super calls the constructor of the parent class
    super(message);
    this.statusCode = statusCode;
    //  captureStackTrace returns a string that represents the location of that particular error in the call. gives us a stack that helps us to find the location of that error in the code. this will help us to find the exact error in our code.
    // "this" is object itself, "this.constructor" constructor of this class
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
