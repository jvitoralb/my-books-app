import { expect, jest, test } from '@jest/globals';
import request from 'supertest';
import app from '../../../app';


describe('User Component Crud Tests', () => {
    const authEndpoint = '/api/v1/auth';
    const usersEndpoint = '/api/v1/users';
    const tokens = jest.fn((token: string | undefined) => token);
    const serverResponse = jest.fn((call: { body: any, statusCode: number, equalTokens?: boolean }) => call);

    afterEach(() => serverResponse.mockClear());

    beforeAll(async () => {
        const res = await request(app)
        .post(`${authEndpoint}/register`)
        .send({
            name: 'users user test',
            email: 'users.user.test@mynotes.app',
            password: 'strongpswd123',
        }).set('Accept', 'application/json');

        tokens(res.body.token);
    });

    test('reads user data using auth token', async () => {
        const res = await request(app)
        .get(usersEndpoint)
        .set('Authorization', 'Bearer ' + tokens.mock.results[0].value as string);

        serverResponse({
            body: res.body,
            statusCode: res.statusCode
        });

        expect(serverResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                body: {
                    name: 'users user test',
                    email: 'users.user.test@mynotes.app'
                },
                statusCode: 200
            })
        );
    });

    test('updates a user email successfully and returns a new token', async () => {
        const res = await request(app)
        .put(`${usersEndpoint}/email`)
        .send({ new_email: 'user.test.novo@library.app' })
        .set('Authorization', 'Bearer ' + tokens.mock.results[0].value as string);

        const accessToken = res.get('Set-Cookie')
        .find(c => c.includes('access_token'))
        ?.split('; ')[0]
        .slice('access_token'.length + 1);

        serverResponse({
            body: res.body,
            statusCode: res.statusCode,
            equalTokens: (tokens.mock.results[0].value === accessToken)
        });
        tokens(accessToken);

        expect(serverResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                body: {},
                statusCode: 204,
                equalTokens: false
            })
        );
    });

    test('updates a user password successfully and returns status code 204', async () => {
        const res = await request(app)
        .put(`${usersEndpoint}/password`)
        .send({ new_password: 'strongpswd123NOVO' })
        .set('Authorization', 'Bearer ' + tokens.mock.results[0].value as string);

        serverResponse({
            body: res.body,
            statusCode: res.statusCode
        });

        expect(serverResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                body: {},
                statusCode: 204
            })
        );
    });

    test('deletes a user successfully and returns status code 204', async () => {
        const res = await request(app)
        .delete(usersEndpoint)
        .set('Authorization', 'Bearer ' + tokens.mock.results[1].value as string);

        serverResponse({
            body: res.body,
            statusCode: res.statusCode
        });

        expect(serverResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                body: {},
                statusCode: 204
            })
        );
    });
});
