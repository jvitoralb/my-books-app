import { expect, test } from '@jest/globals';
import httpMocks from 'node-mocks-http';
import UserMiddleware from '../api/middlewares';
import { BadRequestError } from '../../../lib/errors/custom';


describe('User Validation Tests', () => {
    test('throws a BadRequestError when user credentials are missing', () => {
        let { req, res } = httpMocks.createMocks({
            method: 'POST',
            path: '/api/v1/users/login',
            body: { email: 'user.test@library.app' }
        }, {});
        let next = () => {};

        expect(() => new UserMiddleware().validateReadCredentials(req, res, next))
        .toThrow(new BadRequestError('Missing required field'));
    });

    test('throws BadRequestError when is missing data for creating a user', () => {
        let { req, res } = httpMocks.createMocks({
            method: 'POST',
            path: '/api/v1/users/register',
            body: {
                name: 'user test',
                password: 'strongpswd123'
            }
        }, {});
        let next = () => {};

        expect(() => new UserMiddleware().validateCreate(req, res, next))
        .toThrow(new BadRequestError('Missing required field'));
    });

    test('throws BadRequestError when is missing data to update a user email', () => {
        let { req, res } = httpMocks.createMocks({
            method: 'PUT',
            path: '/api/v1/users/email',
            body: {}
        }, {});
        let next = () => {};

        expect(() => new UserMiddleware().validateUpdateEmail(req, res, next))
        .toThrow(new BadRequestError('Missing required field'));
    });

    test('throws BadRequestError when is missing data to update a user password', () => {
        let { req, res } = httpMocks.createMocks({
            method: 'PUT',
            path: '/api/v1/users/password',
            body: {}
        }, {});
        let next = () => {};

        expect(() => new UserMiddleware().validateUpdatePswd(req, res, next))
        .toThrow(new BadRequestError('Missing required field'));
    });
});
