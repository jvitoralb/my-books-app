import { expect, test } from '@jest/globals';
import httpMocks from 'node-mocks-http';
import { BadRequestError } from '../../../lib/errors/custom';
import BookMiddleware from '../api/middlewares';


describe('Books Components Validations', () => {
    test('throws BadRequestError when trying to create book with undefined title', () => {
        let { req, res } = httpMocks.createMocks({
            method: 'POST',
            path: '/api/v1/books',
            body: {}
        }, {});
        let next = () => {};

        expect(() => new BookMiddleware().validateCreate(req, res, next)).toThrow(new BadRequestError('Missing required field'));
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

        expect(() => new BookMiddleware().validateUpdateInfo(req, res, next)).toThrow(new BadRequestError('Missing required field'));
    });

    test('throws BadRequestError when trying to update info with undefined fields', () => {
        let { req, res } = httpMocks.createMocks({
            method: 'PUT',
            path: '/api/v1/books',
            params: { id: 'book-id' },
            body: { title: 'valid title' }
        }, {});
        let next = () => {};

        expect(() => new BookMiddleware().validateUpdateInfo(req, res, next)).toThrow(new BadRequestError('Missing required field'));
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

        expect(new BookMiddleware().validateUpdateInfo(req, res, next)).toBe(undefined);
    });

    test('throws BadRequestError when trying to update section with empty string', () => {
        let { req, res } = httpMocks.createMocks({
            method: 'PUT',
            path: '/api/v1/books',
            params: { id: 'book-id' },
            body: { section: '' }
        }, {});
        let next = () => {};

        expect(() => new BookMiddleware().validateUpdateSection(req, res, next)).toThrow(new BadRequestError('Missing required field'));
    });

    test('throws BadRequestError when trying to delete a book without id', () => {
        let { req, res } = httpMocks.createMocks({
            method: 'DELETE',
            path: '/api/v1/books',
            params: { id: '' }
        }, {});
        let next = () => {};

        expect(() => new BookMiddleware().validateDelete(req, res, next)).toThrow(new BadRequestError('Missing params'));
    });
});
