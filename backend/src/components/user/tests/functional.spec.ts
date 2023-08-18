import { expect, jest, test } from '@jest/globals';
import request from 'supertest';
import app from '../../../app';


describe('User Component Tests', () => {
    test('creates a user successfully and returns user token and id', async () => {
        const res = await request(app)
        .post('/users')
        .send({
            name: 'user test',
            email: 'user2.test@library.app',
            password: 'strongpswd123',
        }).set('Accept', 'application/json');

        const createdUser = jest.fn();
        createdUser({ body: res.body, statusCode: res.statusCode });

        expect(createdUser).toHaveBeenCalledWith(
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

        const serverResponse = jest.fn();
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

        const serverResponse = jest.fn();
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

    test.todo('updates a user data successfully');
    test.todo('fails to update user data with invalid id');
    test.todo('deletes a user successfully');
    test.todo('fails to delete user with invalid id');
});
