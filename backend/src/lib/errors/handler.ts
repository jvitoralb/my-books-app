import 'dotenv/config';
import { ErrorRequestHandler } from 'express';
import { AppError, ServerError } from './custom';


const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (process.env.NODE_ENV === 'DEV') console.log(err);

    if (!(err instanceof AppError)) {
        err = new ServerError();
    }

    res.status(err.statusCode).json({
        error: err.description ? {
            message: err.message,
            description: err.description
        } : err.message
    });
};

export default errorHandler;