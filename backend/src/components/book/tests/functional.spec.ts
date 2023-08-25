import { expect, test } from '@jest/globals';
import request from 'supertest';
import app from '../../../app'


describe('Book Component', () => {
    const serverResponse = jest.fn();

    test('should be able to create a book successfully', async () => {
        const res = await request(app)
        .post('/api/v1/books')
        .send({
            title: 'A volta dos que não foram'
        }).set('Accept', 'application/json');

        serverResponse({ body: res.body, statusCode: res.statusCode });

        expect(serverResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                body: {
                    id: expect.any(String),
                    title: 'A volta dos que não foram'
                },
                statusCode: 201
            })
        );
    });
    
    test.todo('should answer with 204 when successfully updates a book');
    test.todo('answers with 400 when trying to update with invalid id');
    test.todo('should be able to delete a book successfully');
    test.todo('answers with 400 when trying to delete with invalid id');
});
