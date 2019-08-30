import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

export const apiErrorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(err);
        return res.status(err.status).json(err);
    } else {
        return res.status(err.status).json(err.publicVersion());
    }
};
