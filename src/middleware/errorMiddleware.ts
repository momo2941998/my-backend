import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions';
import { logger } from '../logger';
function errorMiddleware(error: Error, request: Request, response: Response, next: NextFunction) {
  if (error instanceof HttpException) {
    logger.error(error)
    return response.status(error.status).json({
        code: error.code,
        error: error.message,
      })
  } else {
    next(error)
  }
}
 
export {
  errorMiddleware
};