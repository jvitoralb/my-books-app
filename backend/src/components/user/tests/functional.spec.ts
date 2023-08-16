import { expect, jest, test } from '@jest/globals';
import request from 'supertest';
import app from '../../../app';


describe('User Component Tests', () => {
    test('creates a user successfully and returns user token and id', async () => {
        const res = await request(app)
        .post('/users')
        .send({
            name: 'user test',
            email: 'user546.test@library.app',
            password: 'strongpswd123',
        }).set('Accept', 'application/json');

        const createdUser = jest.fn();
        createdUser({ body: res.body, statusCode: res.statusCode });

        expect(createdUser).toHaveBeenCalledWith(
            expect.objectContaining({
                body: {
                    id: expect.any(String),
                    token: expect.stringMatching(/Bearer \S+\.\S+\.\S+/),
                    expires: '7d'
                },
                statusCode: 201
            })
        );
    });

    test.todo('sends a BAD REQUEST when tries to create user with missing data');
    test.todo('updates a user data successfully');
    test.todo('fails to update user data with invalid id');
    test.todo('deletes a user successfully');
    test.todo('fails to delete user with invalid id');
});
