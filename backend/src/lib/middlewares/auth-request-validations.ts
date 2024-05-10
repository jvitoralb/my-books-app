import RequestValidations from './request-validations';
import AuthToken from '../auth/jwt';
import { AuthenticationError } from '../errors/custom';


class AuthRequestValidations extends RequestValidations {
    constructor() {
        super();
    }
    protected checkToken(): void {
        const authToken = this.getRequest.get('Authorization');

        if (!authToken) {
            throw new AuthenticationError('Not Authenticated', 'UNAUTHORIZED', 401);
        }

        const authorized = new AuthToken().validate(authToken);

        if (!authorized.valid) {
            throw new AuthenticationError('Not Authorized', 'FORBIDDEN', 403, authorized.description);
        }
    }
}

export default AuthRequestValidations;