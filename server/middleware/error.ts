import { env } from '../config/env';

export const notFound = (req, res, next) => {
    const error = new Error(`Not Found = ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const { NODE_ENV } = env;

export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: NODE_ENV === 'production' ? null : err.stack,
    });
};