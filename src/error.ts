import httpStatus from 'http-status';
export class CustomError {
  message!: string;
  status!: number;
  additionalInfo!: any;

  constructor(message: string, status = 500, additionalInfo: any = {}) {
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo;
  }
}

export class BadRequestError extends CustomError {
  status!: number;
  message!: string;
  additionalInfo!: any;

  constructor(
    message = 'Bad Request',
    status = httpStatus.BAD_REQUEST,
    additionalInfo: any = {}
  ) {
    super(message, status, additionalInfo);
    this.message = message;
    this.status = status;
    this.additionalInfo = additionalInfo;
  }
}