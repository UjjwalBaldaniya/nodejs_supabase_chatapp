class ApiError extends Error {
  statusCode: number;
  data: null;
  success: boolean;
  errors: string[];

  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors: string[] = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      success: this.success,
      data: this.data,
      errors: this.errors,
    };
  }
}

export { ApiError };
