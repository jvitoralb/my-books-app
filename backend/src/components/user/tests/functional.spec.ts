import { expect, jest, test } from '@jest/globals';
import request from 'supertest';
import app from '../../../app';


describe('User Component Tests', () => {
    const serverResponse = jest.fn((call: { body: any, statusCode: number, equalTokens?: boolean }) => call);

    test('creates a user successfully and returns user token and id', async () => {
        const res = await request(app)
        .post('/users')
        .send({
            name: 'user test',
            email: 'user2.test@library.app',
            password: 'strongpswd123',
        }).set('Accept', 'application/json');

        serverResponse({ body: res.body, statusCode: res.statusCode });

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
        .post('/users')
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
        .post('/users')
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
        }).set('Authorization', serverResponse.mock.calls[0][0].body.token);

        serverResponse({
            body: res.body,
            statusCode: res.statusCode,
            equalTokens: (serverResponse.mock.calls[0][0].body.token === res.body.token)
        });

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
        }).set('Authorization', serverResponse.mock.calls[0][0].body.token);

        serverResponse({ body: res.body, statusCode: res.statusCode });

        expect(serverResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                body: {},
                statusCode: 204
            })
        );
    });

    test.todo('deletes a user successfully');
    test.todo('fails to delete user with invalid id');
});
