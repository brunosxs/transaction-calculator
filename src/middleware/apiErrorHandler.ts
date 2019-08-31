import { ErrorRequestHandler, Request, Response } from 'express';

export const apiErrorHandler: ErrorRequestHandler = async (err, req: Request, res: Response): Promise<Response> => {
    if (process.env.NODE_ENV === 'development') {
        console.log(err);
        return res.status(err.status).json(err);
    } else {
        return res.status(err.status).json(err.publicVersion());
    }
};
