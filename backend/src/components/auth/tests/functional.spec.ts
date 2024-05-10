import request from 'supertest';
import app from '../../../app';


describe('Auth Component Crud Tests', () => {
    const authEndpoint = '/api/v1/auth';

    test('creates a user successfully and returns user token', async () => {
        const res = await request(app)
        .post(`${authEndpoint}/register`)
        .send({
            name: 'auth user test',
            email: 'auth.user.test@mynotes.app',
            password: 'strongpswd123',
        }).set('Accept', 'application/json');

        expect(res.get('Set-Cookie').find(c => c.includes('access_token')))
        .toMatch(/[access_token=]\S+\.\S+\.\S+/);
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
