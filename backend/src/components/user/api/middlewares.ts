import { NextFunction, Request, Response } from 'express';
import AuthRequestValidations from '../../../lib/middlewares/auth-request-validations';

interface Middleware {
    validRequest(req: Request, res: Response, next: NextFunction): void;
    validUpdateEmail(req: Request, res: Response, next: NextFunction): void;
    validUpdatePswd(req: Request, res: Response, next: NextFunction): void;
}

class UserMiddleware extends AuthRequestValidations implements Middleware {
    constructor() {
        super();
    }
    validRequest = (req: Request, res: Response, next: NextFunction) => {
        this.setRequest = req;

        this.checkToken();

        next();
    }
    validUpdateEmail = (req: Request, res: Response, next: NextFunction): void => {
        this.setRequest = req;

        this.checkForNewEmail();

        next();
    }
    validUpdatePswd = (req: Request, res: Response, next: NextFunction): void => {
        this.setRequest = req;

        this.checkForNewPassword();

        next();
    }
}

export default UserMiddleware;