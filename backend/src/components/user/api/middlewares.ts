import { NextFunction, Request, Response, request } from 'express';
import { BadRequestError } from '../../../lib/errors/custom';


class CheckRequestInputs {
    private req: Request;

    constructor() {
        this.req = request;
    }

    protected set setRequest(req: Request) {
        this.req = req;
    }
    protected get getRequest(): Request {
        return this.req;
    }

    protected checkForPassword(): void {
        const { password } = this.req.body;

        if (!password) {
            throw new BadRequestError('Missing required field');
        }
    }
    protected checkForEmail(): void {
        const { email } = this.req.body;

        if (!email) {
            throw new BadRequestError('Missing required field');
        }
    }
    protected checkForName(): void {
        const { name } = this.req.body;

        if (!name) {
            throw new BadRequestError('Missing required field');
        }
    }
    protected checkForNewEmail(): void {
        const { new_email } = this.req.body;

        if (!new_email) {
            throw new BadRequestError('Missing required field');
        }
    }
    protected checkForNewPassword(): void {
        const { new_password } = this.req.body;

        if (!new_password) {
            throw new BadRequestError('Missing required field');
        }
    }
}

interface Middleware {
    validateCreate(req: Request, res: Response, next: NextFunction): void
    validateReadCredentials(req: Request, res: Response, next: NextFunction): void
    validateUpdateEmail(req: Request, res: Response, next: NextFunction): void
    validateUpdatePswd(req: Request, res: Response, next: NextFunction): void
}

class UserMiddleware extends CheckRequestInputs implements Middleware {
    constructor() {
        super();
    }
    validateCreate = (req: Request, res: Response, next: NextFunction): void => {
        this.setRequest = req;

        this.checkForName();
        this.checkForEmail();
        this.checkForPassword();
        
        next();
    }
    validateReadCredentials = (req: Request, res: Response, next: NextFunction): void => {
        this.setRequest = req;

        this.checkForEmail();
        this.checkForPassword();
        
        next();
    }
    validateUpdateEmail = (req: Request, res: Response, next: NextFunction): void => {
        this.setRequest = req;

        this.checkForNewEmail();

        next();
    }
    validateUpdatePswd = (req: Request, res: Response, next: NextFunction): void => {
        this.setRequest = req;

        this.checkForNewPassword();

        next();
    }
}

export default UserMiddleware;