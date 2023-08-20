import { Request, Response, NextFunction, request } from 'express';
import AuthToken from '../../../lib/auth/jwt';
import { AuthenticationError } from '../../../lib/errors/custom';


class Authenticate {
    private req: Request;

    constructor() {
        this.req = request;
    }

    protected set setRequest(req: Request) {
        this.req = req;
    }

    protected checkToken(): void {
        const authToken = this.req.get('Authorization');

        if (!authToken) {
            throw new AuthenticationError('Not Authenticated', 'UNAUTHORIZED', 401);
        }

        const authorized = new AuthToken().validate(authToken);

        if (!authorized) {
            throw new AuthenticationError('Not Authorized', 'FORBIDDEN', 403);
        }
    }
}

class AuthMiddleware extends Authenticate {
    constructor() {
        super();
    }

    authenticateRequest = (req: Request, res: Response, next: NextFunction) => {
        this.setRequest = req;

        this.checkToken();

        next();
    }
}

export default AuthMiddleware;