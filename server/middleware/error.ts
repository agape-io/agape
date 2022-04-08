import { Request, Response, NextFunction } from 'express';

import { ENVIRONMENTS } from '../config/constants';
import { env } from '../config/env';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found = ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const { NODE_ENV } = env;

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode: number = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: NODE_ENV === ENVIRONMENTS.PRODUCTION ? null : err.stack,
  });
};
