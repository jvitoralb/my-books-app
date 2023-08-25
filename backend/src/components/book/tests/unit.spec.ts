import { expect, test } from '@jest/globals';
import httpMocks from 'node-mocks-http';
import { BadRequestError } from '../../../lib/errors/custom';
import BookMiddleware from '../api/middlewares';


describe('Books Components Validations', () => {
    test('throws BadRequestError when trying to create wihtout title in request body', () => {
        let { req, res } = httpMocks.createMocks({
            method: 'POST',
            path: '/api/v1/books',
            body: {
                title: ''
            }
        }, {});
        let next = () => {};

        expect(() => new BookMiddleware().validateCreate(req, res, next)).toThrow(new BadRequestError('Missing required field'));
    });

    test('throws BadRequestError when trying to upate with no data', () => {
        let { req, res } = httpMocks.createMocks({
            method: 'PUT',
            path: '/api/v1/books',
            params: {
                id: 'book-id'
            },
            body: {
                title: '',
                about: '',
                author: '',
                user_section: ''
            }
        }, {});
        let next = () => {};

        expect(() => new BookMiddleware().validateUpdate(req, res, next)).toThrow(new BadRequestError('Missing required field'));
    });

    test('throws BadRequestError when trying to delete a book without id', () => {
        let { req, res } = httpMocks.createMocks({
            method: 'DELETE',
            path: '/api/v1/books',
            params: {
                id: ''
            }
        }, {});
        let next = () => {};

        expect(() => new BookMiddleware().validateDelete(req, res, next)).toThrow(new BadRequestError('Missing params'));
    });
});
