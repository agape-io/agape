import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../config/env';
import { AUTH_ERRORS } from '../config/errorMessages';

const { JSONWebToken, ADMIN } = env;

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token: string = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      status: 403,
      message: AUTH_ERRORS.MISSING_TOKEN,
    });
  }

  try {
    jwt.verify(token, JSONWebToken.Key);
  } catch (err: any) {
    console.error(err);
    return res.status(401).send({
      status: 401,
      message: AUTH_ERRORS.INVALID_TOKEN,
    });
  }
  return next();
};

export const authenticateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const token: string = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      status: 403,
      message: AUTH_ERRORS.MISSING_TOKEN,
    });
  }

  try {
    jwt.verify(token, ADMIN.TokenKey);
  } catch (err: any) {
    console.error(err);
    return res.status(401).send({
      status: 401,
      message: AUTH_ERRORS.INVALID_TOKEN,
    });
  }
  return next();
};
