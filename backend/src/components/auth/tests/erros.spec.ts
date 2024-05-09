import request from 'supertest';
import app from '../../../app';


describe('Auth Component Error Handling Tests', ()=> {
    const authEndpoint = '/api/v1/auth'
    const serverResponse = jest.fn((call: { body: any, statusCode: number }) => call);

    afterEach(() => serverResponse.mockClear());

    test('answers with BAD REQUEST when creating a user with missing data', async () => {
        const res = await request(app)
        .post(`${authEndpoint}/register`)
        .send({
            name: 'user test',
            password: 'strongpswd123',
        }).set('Accept', 'application/json');

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

    test('answers with BAD REQUEST when trying to register with duplicate email', async () => {
        const res = await request(app)
        .post(`${authEndpoint}/register`)
        .send({
            name: 'user test2',
            email: 'user.test.duplicate@library.app',
            password: 'strongpswd123',
        }).set('Accept', 'application/json');

        serverResponse({
            body: res.body,
            statusCode: res.statusCode
        });

        expect(serverResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                body: { error: 'Email already exists' },
                statusCode: 400
            })
        );
    });

    test('should answer with BAD REQUEST when trying to access a user that doesn\'t exists', async () => {
        const res = await request(app)
        .post(`${authEndpoint}/login`)
        .send({
            email: 'null.null@lib.app',
            password: 'nullpswd123'
        }).set('Accept', 'application/json');

        serverResponse({
            body: res.body,
            statusCode: res.statusCode
        });

        expect(serverResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                body: { error: 'User does not exists' },
                statusCode: 400
            })
        );
    });

    test('answers with BAD REQUEST when logging a user with missing data', async () => {
        const res = await request(app)
        .post(`${authEndpoint}/login`)
        .send({
            email: '',
            password: 'strongpswd123',
        }).set('Accept', 'application/json');

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
