import { expect, test } from '@jest/globals';
import request from 'supertest';
import app from '../../../app'


describe('Book Component', () => {
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

    test('should be able to create a book successfully', async () => {
        const res = await request(app)
        .post('/api/v1/books')
        .send({ title: 'A volta dos que não foram' })
        .set('Authorization', userToken.mock.results[0].value)
        .set('Accept', 'application/json');

        serverResponse({ body: res.body, statusCode: res.statusCode });

        expect(serverResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                body: {
                    id: expect.any(String),
                    title: 'A volta dos que não foram'
                },
                statusCode: 201
            })
        );
    });

    test('answers with 400 when trying to create a book with no data', async () => {
        const res = await request(app)
        .post(`/api/v1/books`)
        .send({})
        .set('Authorization', userToken.mock.results[0].value)
        .set('Accept', 'application/json');

        serverResponse({ body: res.body, statusCode: res.statusCode });

        expect(serverResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                body: { error: 'Missing required field' },
                statusCode: 400
            })
        );
    });

    test('should answer with 204 when successfully updates info', async () => {
        const res = await request(app)
        .put(`/api/v1/books/${serverResponse.mock.results[0].value.body.id as string}/info`)
        .send({
            title: 'A volta dos que não foram',
            author: 'ninguém'
        })
        .set('Authorization', userToken.mock.results[0].value)
        .set('Accept', 'application/json');

        expect(res.statusCode).toBe(204);
    });

    test('should answer with 204 when successfully updates section', async () => {
        const res = await request(app)
        .put(`/api/v1/books/${serverResponse.mock.results[0].value.body.id as string}/section`)
        .send({ section: 'section updated' })
        .set('Authorization', userToken.mock.results[0].value)
        .set('Accept', 'application/json');

        expect(res.statusCode).toBe(204);
    });

    test('should answer with 400 when trying to update a book info with no data', async () => {
        const res = await request(app)
        .put(`/api/v1/books/${serverResponse.mock.results[0].value.body.id as string}/info`)
        .send({})
        .set('Authorization', userToken.mock.results[0].value)
        .set('Accept', 'application/json');

        expect(res.statusCode).toBe(400);
    });

    test('should answer with all created books', async () => {
        const res = await request(app)
        .get('/api/v1/books')
        .set('Authorization', userToken.mock.results[0].value)
        .set('Accept', 'application/json');

        serverResponse({ body: res.body, statusCode: 200 });

        expect(serverResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                body: [
                    expect.objectContaining({
                        id: expect.any(String),
                        user_id: expect.any(String),
                        title: expect.any(String),
                        author: expect.any(String),
                        about: expect.any(String),
                        section: expect.any(String),
                    })
                ],
                statusCode: 200
            })
        );
    });

    test('should be able to delete a book successfully and return 204', async () => {
        const res = await request(app)
        .delete(`/api/v1/books/${serverResponse.mock.results[0].value.body.id as string}`)
        .set('Authorization', userToken.mock.results[0].value)
        .set('Accept', 'application/json');

        expect(res.statusCode).toBe(204);
    });
});
