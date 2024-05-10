import httpMocks from 'node-mocks-http';
import AuthMiddleware from '../api/middlewares';
import { BadRequestError } from '../../../lib/errors/custom';


describe('Authentication Middleware', () => {
    const authEndpoint = '/api/v1/auth';

    test('throws a BadRequestError when user credentials are missing', () => {
        let { req, res } = httpMocks.createMocks({
            method: 'POST',
            path: `${authEndpoint}/login`,
            body: { email: 'user.test@library.app' }
        }, {});
        let next = () => {};

        expect(() => new AuthMiddleware().validCredentials(req, res, next))
        .toThrow(new BadRequestError('Missing required field'));
    });

    test('throws BadRequestError when is missing data for creating a user', () => {
        let { req, res } = httpMocks.createMocks({
            method: 'POST',
            path: `${authEndpoint}/register`,
            body: {
                name: 'user test',
                password: 'strongpswd123'
            }
        }, {});
        let next = () => {};

        expect(() => new AuthMiddleware().validCreate(req, res, next))
        .toThrow(new BadRequestError('Missing required field'));
    });
});
