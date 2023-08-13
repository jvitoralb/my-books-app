import { Request } from 'express';
import auth from '../../../lib/auth/auth';
import { AuthenticationError } from '../../../lib/errors/custom';


class Authenticate {
    req: Request;

    constructor(req: Request) {
        this.req = req;
    }

    checkToken(): void {
        const authToken = this.req.get('Authorization');

        if (!authToken) {
            throw new AuthenticationError('Not Authenticated', 'UNAUTHORIZED', 401);
        }

        const authorized = auth(authToken);

        if (!authorized) {
            throw new AuthenticationError('Not Authorized', 'FORBIDDEN', 403);
        }
    }
}

export {
    Authenticate
};