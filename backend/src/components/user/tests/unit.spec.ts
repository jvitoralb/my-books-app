import { expect, test } from '@jest/globals';
import httpMocks from 'node-mocks-http';
import UserMiddleware from '../api/middlewares';
import { BadRequestError } from '../../../lib/errors/custom';


describe('User Validation Tests', () => {
    test('throws a BadRequestError when is missing data for logging a user', () => {
        let { req, res } = httpMocks.createMocks({
            method: 'POST',
            path: '/users/login',
            body: {
                email: 'user.test@library.app'
            }
        }, {});
        let next = () => {};

        let middleware = new UserMiddleware();

        expect(() => middleware.validateReadCredentials(req, res, next))
        .toThrow(new BadRequestError('Missing required field'));
    });

    test('throws BadRequestError when is missing data for creating a user', () => {
        let { req, res } = httpMocks.createMocks({
            method: 'POST',
            path: '/users/register',
            body: {
                name: 'user test',
                password: 'strongpswd123'
            }
        }, {});
        let next = () => {};

        let middleware = new UserMiddleware();

        expect(() => middleware.validateCreate(req, res, next))
        .toThrow(new BadRequestError('Missing required field'));
    });

    test('throws BadRequestError when is missing data to update a user email', () => {
        let { req, res } = httpMocks.createMocks({
            method: 'PUT',
            path: '/users/email',
            body: {}
        }, {});
        let next = () => {};

        let middleware = new UserMiddleware();

        expect(() => middleware.validateUpdateEmail(req, res, next))
        .toThrow(new BadRequestError('Missing required field'));
    });

    test('throws BadRequestError when is missing data to update a user password', () => {
        let { req, res } = httpMocks.createMocks({
            method: 'PUT',
            path: '/users/password',
            body: {}
        }, {});
        let next = () => {};

        let middleware = new UserMiddleware();

        expect(() => middleware.validateUpdatePswd(req, res, next))
        .toThrow(new BadRequestError('Missing required field'));
    });
});
