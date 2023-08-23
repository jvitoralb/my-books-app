import { expect, jest, test } from '@jest/globals';
import request from 'supertest';
import app from '../../../app';


describe('User Component Tests', () => {
    const tokens = jest.fn((token: string) => token);
    const serverResponse = jest.fn((call: { body: any, statusCode: number, equalTokens?: boolean }) => call);

    afterEach(() => serverResponse.mockClear());

    test('creates a user successfully and returns user token', async () => {
        const res = await request(app)
        .post('/api/v1/users/register')
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

    test('answers with BAD REQUEST when trying to create user with missing data', async () => {
        const res = await request(app)
        .post('/api/v1/users/register')
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
        .post('/api/v1/users/register')
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

    test('reads user data using auth token', async () => {
        const res = await request(app)
        .get('/api/v1/users')
        .set('Authorization', tokens.mock.results[0].value as string);

        serverResponse({ body: res.body, statusCode: 200 });

        expect(serverResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                body: {
                    name: 'user test',
                    email: 'user.test@library.app'
                },
                statusCode: 200
            })
        );
    });

    test('issues a token when receives a valid password and email', async () => {
        const res = await request(app)
        .post('/api/v1/users/login')
        .send({
            email: 'old-user.test@library.app',
            password: 'old-strongpswd123',
        }).set('Accept', 'application/json');

        serverResponse({ body: res.body, statusCode: res.statusCode });

        expect(serverResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                body: {
                    token: expect.stringMatching(/Bearer \S+\.\S+\.\S+/),
                    expires: '7d'
                },
                statusCode: 200
            })
        );
    });

    test('should answer with BAD REQUEST when trying to access a user that doesn\'t exists', async () => {
        const res = await request(app)
        .post('/api/v1/users/login')
        .send({
            email: 'null.null@lib.app',
            password: 'nullpswd123'
        }).set('Accept', 'application/json');

        serverResponse({ body: res.body, statusCode: res.statusCode});

        expect(serverResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                body: {
                    error: 'User does not exists'
                },
                statusCode: 400
            })
        );
    });

    test('updates a user email successfully and returns a new token', async () => {
        const res = await request(app)
        .put('/api/v1/users/email')
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

    test('updates a user password successfully and returns status code 204', async () => {
        const res = await request(app)
        .put('/api/v1/users/password')
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
        .delete('/api/v1/users')
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
