import { Request, Response, NextFunction } from 'express';
import RequestValidations from '../../../lib/middlewares/request-validations';


class AuthMiddleware extends RequestValidations {
    constructor() {
        super();
    }
    validCreate = (req: Request, res: Response, next: NextFunction): void => {
        this.setRequest = req;

        this.checkForName();
        this.checkForEmail();
        this.checkForPassword();
        
        next();
    }
    validCredentials = (req: Request, res: Response, next: NextFunction): void => {
        this.setRequest = req;

        this.checkForEmail();
        this.checkForPassword();
        
        next();
    }
}

export default AuthMiddleware;