export class HttpError extends Error {
  code: number;

  constructor(code: number, message: string) {
    super(message);
    this.name = "HttpError";
    this.code = code;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HttpError);
    }
  }

  log() {
    console.log(`Http error ${this.code}: ${this.message}`);
  }

  response(){
    return {
      code: this.code,
      message: this.message
    }
  }
}
