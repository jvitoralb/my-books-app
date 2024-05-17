import request from 'supertest';
import app from '../../../app';


describe('Auth Component Crud Tests', () => {
    const authEndpoint = '/api/v1/auth';
    const serverResponse = jest.fn((call: { body: any, statusCode: number, accessCookie: string }) => call);

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
            statusCode: res.statusCode,
            accessCookie: res.get('Set-Cookie').find(c => c.includes('access_token'))!.split('; ')[0]
        });

        expect(serverResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                body: {
                    name: 'auth user test',
                    email: 'auth.user.test@mynotes.app',
                },
                statusCode: 201,
                accessCookie: expect.stringMatching(/[access_token=]\S+\.\S+\.\S+/)
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

        expect(res.get('Set-Cookie').find(c => c.includes('access_token')))
        .toMatch(/[access_token=]\S+\.\S+\.\S+/);
    });
});
