import { RequestHandler } from 'express';
import { APIError } from './responseMessages';

export const apiValidation: RequestHandler = (req, res, next) => {
    res.json(req.headers);
    if (req.accepts('application/json')) {
        next();
    } else {
        next(new APIError('Content app not supported', 'This api only supports application/json', 400));
    }
};
