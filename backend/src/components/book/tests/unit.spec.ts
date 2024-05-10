import { expect, test } from '@jest/globals';
import httpMocks from 'node-mocks-http';
import BookMiddleware from '../api/middlewares';
import { AuthenticationError, BadRequestError } from '../../../lib/errors/custom';


describe('Books Components Validations', () => {
    test('throws AuthenticationError when there\'s no auth token', () => {
        let { req, res } = httpMocks.createMocks({
            headers: {}
        });
        let next = () => {}
        
        expect(() => new BookMiddleware().validRequest(req, res, next))
        .toThrow(new AuthenticationError('Not Authenticated', 'UNAUTHORIZED', 401));
    });

    test('throws BadRequestError when trying to create book with undefined title', () => {
        let { req, res } = httpMocks.createMocks({
            method: 'POST',
            path: '/api/v1/books',
            body: {}
        }, {});
        let next = () => {};

        expect(() => new BookMiddleware().validCreate(req, res, next))
        .toThrow(new BadRequestError('Missing required field'));
    });

    test('throws BadRequestError when trying to update info with empty strings', () => {
        let { req, res } = httpMocks.createMocks({
            method: 'PUT',
            path: '/api/v1/books',
            params: { id: 'book-id' },
            body: {
                title: '',
                about: '',
                author: '',
            }
        }, {});
        let next = () => {};

        expect(() => new BookMiddleware().validUpdateInfo(req, res, next))
        .toThrow(new BadRequestError('Missing required field'));
    });

    test('throws BadRequestError when trying to update info with undefined fields', () => {
        let { req, res } = httpMocks.createMocks({
            method: 'PUT',
            path: '/api/v1/books',
            params: { id: 'book-id' },
            body: { title: 'valid title' }
        }, {});
        let next = () => {};

        expect(() => new BookMiddleware().validUpdateInfo(req, res, next))
        .toThrow(new BadRequestError('Missing required field'));
    });

    test('returns undefined when updating info with null fields and valid title', () => {
        let { req, res } = httpMocks.createMocks({
            method: 'PUT',
            path: '/api/v1/books',
            params: { id: 'book-id' },
            body: {
                title: 'valid title',
                about: null,
                author: null
            }
        }, {});
        let next = () => {};

        expect(new BookMiddleware().validUpdateInfo(req, res, next)).toBe(undefined);
    });

    test('throws BadRequestError when trying to update section with empty string', () => {
        let { req, res } = httpMocks.createMocks({
            method: 'PUT',
            path: '/api/v1/books',
            params: { id: 'book-id' },
            body: { section: '' }
        }, {});
        let next = () => {};

        expect(() => new BookMiddleware().validUpdateSection(req, res, next))
        .toThrow(new BadRequestError('Missing required field'));
    });

    test('throws BadRequestError when trying to delete a book without id', () => {
        let { req, res } = httpMocks.createMocks({
            method: 'DELETE',
            path: '/api/v1/books',
            params: { id: '' }
        }, {});
        let next = () => {};

        expect(() => new BookMiddleware().validDelete(req, res, next))
        .toThrow(new BadRequestError('Missing params'));
    });
});
