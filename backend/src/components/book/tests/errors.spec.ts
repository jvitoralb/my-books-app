import { expect, test } from '@jest/globals';
import request from 'supertest';
import app from '../../../app'


describe('Book Component Error Handling Tests', () => {
    const userToken = jest.fn((token: string): string => token);
    const serverResponse = jest.fn((res: { body: any, statusCode: number }) => res);

    beforeAll(async () => {
        const res = await request(app)
        .post('/api/v1/users/login')
        .send({
            email: 'old-user.test@library.app',
            password: 'old-strongpswd123'
        }).set('Accept', 'application/json')

        userToken(res.body.token)
    });

    test('answers with 400 when trying to create a book with no title', async () => {
        const res = await request(app)
        .post(`/api/v1/books`)
        .send({})
        .set('Authorization', userToken.mock.results[0].value)
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

    test('should answer with 400 when trying to update a book info with no data', async () => {
        const res = await request(app)
        .put(`/api/v1/books/book-uuid/info`)
        .send({})
        .set('Authorization', userToken.mock.results[0].value)
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

    test('should answer with 400 when trying to update a book info with no data', async () => {
        const res = await request(app)
        .put(`/api/v1/books/book-uuid/section`)
        .send({})
        .set('Authorization', userToken.mock.results[0].value)
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
