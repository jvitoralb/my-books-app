import httpMocks from 'node-mocks-http';
import { CreateUserValidation, DeleteUserValidation } from '../api/middlewares';
import { BadRequestError } from '../../../lib/errors/custom';


describe('User Validation Tests', () => {
    test('should throw Error when there\'s no password in request body', () => {
        let req = httpMocks.createRequest({
            method: 'POST',
            path: '/users',
            body: {
                email: 'user-test@library.com',
                name: 'user test'
            }
        });

        let validator = new CreateUserValidation(req);

        expect(() => validator.checkForPassword()).toThrow(BadRequestError);
    });
    test('should throw Error when there\'s no email in request body', () => {
        let req = httpMocks.createRequest({
            method: 'POST',
            path: '/users',
            body: {
                name: 'user test',
                password: 'stronguserpswd'
            }
        });

        let validator = new CreateUserValidation(req);

        expect(() => validator.checkForEmail()).toThrow(BadRequestError);
    });
    test('should throw Error when there\'s no name in request body', () => {
        let req = httpMocks.createRequest({
            method: 'POST',
            path: '/users',
            body: {
                email: 'user-test@library.com',
                password: 'stronguserpswd'
            }
        });

        let validator = new CreateUserValidation(req);

        expect(() => validator.checkForName()).toThrow(BadRequestError);
    });
    test('should return undefined when all data exists in request body', () => {
        let req = httpMocks.createRequest({
            method: 'POST',
            path: '/users',
            body: {
                email: 'user-test@library.com',
                name: 'user test',
                password: 'stronguserpswd'
            }
        });

        let validator = new CreateUserValidation(req);

        expect(validator.checkAllInputs()).toBe(undefined);
    });
    test('should throw Error when there\'s no id in request params', () => {
        let req = httpMocks.createRequest({
            method: 'DELETE',
            path: '/users',
            params: {}
        });

        let validator = new DeleteUserValidation(req);

        expect(() => validator.checkForId()).toThrow(BadRequestError);
    });
});