import { Response } from 'express';

export class RouteResponse {
  public static sucess(res: Response, content, message?: string) {
    return res.status(200).json({ message: message || 'Sucess', content });
  }

  public static sucessCreated(res: Response, content, message?: string) {
    return res
      .status(201)
      .json({ message: message || 'Sucess Create', content });
  }

  public static successEmpty(res: Response, message?: string) {
    return res.status(204).json({ message: message || 'Sucess' });
  }

  public static error(res: Response, message?: string) {
    return res.status(400).json({ message: message || 'Bad Request' });
  }

  public static serverError(res: Response, message?: string) {
    return res.status(500).json({ message: message || 'Server Error' });
  }

  public static notFound(res: Response, message?: string) {
    return res.status(500).json({ message: message || 'Entity not found' });
  }

  public static unauthorizedError(res: Response, message?: string) {
    return res.status(500).json({ message: message || 'Unauthorized Access' });
  }
}
