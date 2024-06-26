import { expect, test } from '@jest/globals';
import request from 'supertest';
import app from '../../../app'


describe('Book Component Error Handling Tests', () => {
    const authEndpoint = '/api/v1/auth';
    const booksEndpoint = '/api/v1/books';
    const userToken = jest.fn((token: string): string => token);
    const serverResponse = jest.fn((res: { body: any, statusCode: number }) => res);

    beforeAll(async () => {
        const res = await request(app)
        .post(`${authEndpoint}/login`)
        .send({
            email: 'old-user.test@library.app',
            password: 'old-strongpswd123'
        }).set('Accept', 'application/json')

        userToken(res.body.token);
    });

    afterEach(() => serverResponse.mockClear());

    test('answers with 400 when trying to create a book with undefined title', async () => {
        const res = await request(app)
        .post(booksEndpoint)
        .send({})
        .set('Authorization', 'Bearer ' + userToken.mock.results[0].value)
        .set('Accept', 'application/json');

        serverResponse({
            body: res.body,
            statusCode: res.statusCode
        });

        expect(serverResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                body: { error: 'Missing required field' },
                statusCode: 400
            })
        );
    });

    test('should answer with 400 when updating a book info with undefined fields and a valid title', async () => {
        const res = await request(app)
        .put(`${booksEndpoint}/book-uuid/info`)
        .send({ title: 'valid title' })
        .set('Authorization', 'Bearer ' + userToken.mock.results[0].value)
        .set('Accept', 'application/json');

        serverResponse({
            body: res.body,
            statusCode: res.statusCode
        });

        expect(serverResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                body: { error: 'Missing required field' },
                statusCode: 400
            })
        );
    });

    test('should answer with 400 when updating a book info with an undefined field and a valid title', async () => {
        const res = await request(app)
        .put(`${booksEndpoint}/book-uuid/info`)
        .send({
            title: 'valid title',
            about: null
        })
        .set('Authorization', 'Bearer ' + userToken.mock.results[0].value)
        .set('Accept', 'application/json');

        serverResponse({
            body: res.body,
            statusCode: res.statusCode
        });

        expect(serverResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                body: { error: 'Missing required field' },
                statusCode: 400
            })
        );
    });

    test('should answer with 400 when trying to update a section with empty string', async () => {
        const res = await request(app)
        .put(`${booksEndpoint}/book-uuid/section`)
        .send({ section: '' })
        .set('Authorization', 'Bearer ' + userToken.mock.results[0].value)
        .set('Accept', 'application/json');

        serverResponse({
            body: res.body,
            statusCode: res.statusCode
        });

        expect(serverResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                body: { error: 'Missing required field' },
                statusCode: 400
            })
        );
    });
});
