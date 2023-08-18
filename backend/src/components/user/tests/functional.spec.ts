import { expect, jest, test } from '@jest/globals';
import request from 'supertest';
import app from '../../../app';


describe('User Component Tests', () => {
    const tokens = jest.fn((token: string) => token);
    const serverResponse = jest.fn((call: { body: any, statusCode: number, equalTokens?: boolean }) => call);

    afterEach(() => serverResponse.mockClear());

    test('creates a user successfully and returns user token', async () => {
        const res = await request(app)
        .post('/users/register')
        .send({
            name: 'user test',
            email: 'user.test@library.app',
            password: 'strongpswd123',
        }).set('Accept', 'application/json');

        serverResponse({ body: res.body, statusCode: res.statusCode });
        tokens(res.body.token);

        expect(serverResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                body: {
                    token: expect.stringMatching(/Bearer \S+\.\S+\.\S+/),
                    expires: '7d'
                },
                statusCode: 201
            })
        );
    });

    test('answers a BAD REQUEST when trying to create user with missing data', async () => {
        const res = await request(app)
        .post('/users/register')
        .send({
            name: 'user test',
            password: 'strongpswd123',
        }).set('Accept', 'application/json');

        serverResponse({ body: res.body, statusCode: res.statusCode });

        expect(serverResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                body: {
                    error: 'Missing required field'
                },
                statusCode: 400
            })
        );
    });

    test('answers with BAD REQUEST when trying to register with an email already registered', async () => {
        const res = await request(app)
        .post('/users/register')
        .send({
            name: 'user test2',
            email: 'user.test@library.app',
            password: 'strongpswd123',
        }).set('Accept', 'application/json');

        serverResponse({ body: res.body, statusCode: res.statusCode });

        expect(serverResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                body: {
                    error: 'Email already exists'
                },
                statusCode: 400
            })
        );
    });

    test('updates a user email successfully', async () => {
        const res = await request(app)
        .put('/users/email')
        .send({
            new_email: 'user.test.novo@library.app'
        }).set('Authorization', tokens.mock.results[0].value as string);

        serverResponse({
            body: res.body,
            statusCode: res.statusCode,
            equalTokens: (tokens.mock.results[0].value === res.body.token)
        });
        tokens(res.body.token);

        expect(serverResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                body: {
                    token: expect.stringMatching(/Bearer \S+\.\S+\.\S+/),
                    expires: '7d'
                },
                statusCode: 200,
                equalTokens: false
            })
        );
    });

    test('updates a user password successfully', async () => {
        const res = await request(app)
        .put('/users/password')
        .send({
            new_password: 'strongpswd123NOVO'
        }).set('Authorization', tokens.mock.results[0].value as string);

        serverResponse({ body: res.body, statusCode: res.statusCode });

        expect(serverResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                body: {},
                statusCode: 204
            })
        );
    });

    test('deletes a user successfully and returns status code 204', async () => {
        const res = await request(app)
        .delete('/users')
        .set('Authorization', tokens.mock.results[1].value as string);

        serverResponse({ body: res.body, statusCode: res.statusCode });

        expect(serverResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                body: {},
                statusCode: 204
            })
        );
    });
});
