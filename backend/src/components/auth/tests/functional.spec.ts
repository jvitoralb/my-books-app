import request from 'supertest';
import app from '../../../app';


describe('Auth Component Crud Tests', () => {
    const authEndpoint = '/api/v1/auth';
    const serverResponse = jest.fn((call: { body: any, statusCode: number, equalTokens?: boolean }) => call);

    afterEach(() => serverResponse.mockClear());

    test('creates a user successfully and returns user token', async () => {
        const res = await request(app)
        .post(`${authEndpoint}/register`)
        .send({
            name: 'auth user test',
            email: 'auth.user.test@mynotes.app',
            password: 'strongpswd123',
        }).set('Accept', 'application/json');

        serverResponse({
            body: res.body,
            statusCode: res.statusCode
        });

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

    test('issues a token when receives a valid password and email', async () => {
        const res = await request(app)
        .post(`${authEndpoint}/login`)
        .send({
            email: 'old-user.test@library.app',
            password: 'old-strongpswd123',
        }).set('Accept', 'application/json');

        serverResponse({
            body: res.body,
            statusCode: res.statusCode
        });

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
});
