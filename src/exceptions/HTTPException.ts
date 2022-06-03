interface InputHttpException {
  status?: number,
  message?: string,
  code?: number,
  error?: Error
}

class HttpException extends Error {
  status: number;
  code: number;
  constructor(x?: InputHttpException) {
    const defaultMessage = 'Something went wrong';
    if (x) {
      super(x.message);
      if (this.message.trim().length == 0) this.message = defaultMessage;
      this.status = x.status || 500;
      this.code = x.code || 500;
    } else {
      super(defaultMessage)
      this.status = 500
      this.code = 500
    }
  }
}
 
export default HttpException;