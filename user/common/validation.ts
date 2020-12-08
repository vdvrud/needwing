import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';
import { response } from './response';

const validationErrorCheck = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return response(res, 400, errors.array())
    }
    next();
}

export { validationErrorCheck }