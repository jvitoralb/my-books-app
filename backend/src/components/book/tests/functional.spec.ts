import { expect, test } from '@jest/globals';
import request from 'supertest';
import app from '../../../app'


describe('Book Component Crud Tests', () => {
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

    test('should be able to create a book successfully', async () => {
        const res = await request(app)
        .post(booksEndpoint)
        .send({ title: 'A volta dos que não foram' })
        .set('Authorization', 'Bearer ' + userToken.mock.results[0].value)
        .set('Accept', 'application/json');

        serverResponse({
            body: res.body,
            statusCode: res.statusCode
        });

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

    test('should answer with all created books', async () => {
        const res = await request(app)
        .get(booksEndpoint)
        .set('Authorization', 'Bearer ' + userToken.mock.results[0].value)
        .set('Accept', 'application/json');

        serverResponse({
            body: res.body,
            statusCode: res.statusCode
        });

        expect(serverResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                body: expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(String),
                        user_id: expect.any(String),
                        title: expect.any(String),
                        created_at: expect.any(String)
                    })
                ]),
                statusCode: 200
            })
        );
    });

    test('should answer with 204 when successfully updates info', async () => {
        const res = await request(app)
        .put(`${booksEndpoint}/${serverResponse.mock.results[0].value.body.id}/info`)
        .send({
            title: 'A volta dos que não foram',
            author: 'ninguém',
            about: null
        })
        .set('Authorization', 'Bearer ' + userToken.mock.results[0].value)
        .set('Accept', 'application/json');

        expect(res.statusCode).toBe(204);
    });

    test('should answer with 204 when successfully updates section', async () => {
        const res = await request(app)
        .put(`${booksEndpoint}/${serverResponse.mock.results[0].value.body.id}/section`)
        .send({ section: 'section update' })
        .set('Authorization', 'Bearer ' + userToken.mock.results[0].value)
        .set('Accept', 'application/json');

        expect(res.statusCode).toBe(204);
    });

    test('should be able to delete a book successfully and return 204', async () => {
        const res = await request(app)
        .delete(`${booksEndpoint}/${serverResponse.mock.results[0].value.body.id}`)
        .set('Authorization', 'Bearer ' + userToken.mock.results[0].value)
        .set('Accept', 'application/json');

        expect(res.statusCode).toBe(204);
    });
});
