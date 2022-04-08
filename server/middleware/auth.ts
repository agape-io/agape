import jwt from 'jsonwebtoken';

import { env } from '../config/env';

const { JSONWebToken, ADMIN } = env;

export const authenticateToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      status: 403,
      message: 'A token is required for authentication',
    });
  }

  try {
    const decoded = jwt.verify(token, JSONWebToken.Key);
    req.user = decoded;
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      status: 401,
      message: 'Invalid Token',
    });
  }
  return next();
};

export const authenticateAdmin = async (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      status: 403,
      message: 'An admin token is required for authentication',
    });
  }

  try {
    jwt.verify(token, ADMIN.TokenKey);
  } catch (err) {
    console.log(err);
    return res.status(401).send({
      status: 401,
      message: 'Invalid Admin Token!',
    });
  }

  return next();
};
