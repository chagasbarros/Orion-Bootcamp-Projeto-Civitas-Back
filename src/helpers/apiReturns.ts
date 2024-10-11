import { Response } from 'express';

export class ok {
  public readonly statusCode: number = 200;
  public readonly content;
  constructor(response: Response, content) {
    response.status(this.statusCode).json({ content });
  }
}

export class ApiReturn {
  public readonly statusCode: number;
  public readonly message: string;
  constructor(response: Response, statusCode: number, message: string) {
    response.status(statusCode).json({ statusCode, message });
  }
}

export class NotFoundError extends ApiReturn {
  constructor(response, message = 'Not Found') {
    super(response, 404, message);
  }
}

export class UnauthorizedError extends ApiReturn {
  constructor(response, message = 'Unauthorized access') {
    super(response, 401, message);
  }
}

export class BadRequestError extends ApiReturn {
  constructor(response, message = 'Bad Request') {
    super(response, 400, message);
  }
}

export class InternalServerError extends ApiReturn {
  constructor(response, message = 'Internal Server Error') {
    super(response, 500, message);
  }
}
