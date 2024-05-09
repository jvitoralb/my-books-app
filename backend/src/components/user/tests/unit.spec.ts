import { expect, test } from '@jest/globals';
import httpMocks from 'node-mocks-http';
import UserMiddleware from '../api/middlewares';
import { BadRequestError } from '../../../lib/errors/custom';


describe('User Validation Tests', () => {
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
