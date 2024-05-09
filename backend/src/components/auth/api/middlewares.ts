import { Request, Response, NextFunction, request } from 'express';
import { AuthenticationError, BadRequestError } from '../../../lib/errors/custom';
import AuthToken from '../../../lib/auth/jwt';


class Authenticate {
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

    protected checkToken(): void {
        const authToken = this.req.get('Authorization');

        if (!authToken) {
            throw new AuthenticationError('Not Authenticated', 'UNAUTHORIZED', 401);
        }

        const authorized = new AuthToken().validate(authToken);

        if (!authorized.valid) {
            throw new AuthenticationError('Not Authorized', 'FORBIDDEN', 403, authorized.description);
        }
    }
}

class CheckRequestInputs extends Authenticate {
    // private req: Request;

    constructor() {
        super();
        // this.req = request;
    }
    // protected set setRequest(req: Request) {
    //     this.req = req;
    // }
    // protected get getRequest(): Request {
    //     return this.req;
    // }

    protected checkForPassword(): void {
        const { password } = this.getRequest.body;

        if (!password) {
            throw new BadRequestError('Missing required field');
        }
    }
    protected checkForEmail(): void {
        const { email } = this.getRequest.body;

        if (!email) {
            throw new BadRequestError('Missing required field');
        }
    }
    protected checkForName(): void {
        const { name } = this.getRequest.body;

        if (!name) {
            throw new BadRequestError('Missing required field');
        }
    }
    protected checkForNewEmail(): void {
        const { new_email } = this.getRequest.body;

        if (!new_email) {
            throw new BadRequestError('Missing required field');
        }
    }
    protected checkForNewPassword(): void {
        const { new_password } = this.getRequest.body;

        if (!new_password) {
            throw new BadRequestError('Missing required field');
        }
    }
}

class AuthMiddleware extends CheckRequestInputs {
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
    authenticateRequest = (req: Request, res: Response, next: NextFunction) => {
        this.setRequest = req;

        this.checkToken();

        next();
    }
}

export default AuthMiddleware;