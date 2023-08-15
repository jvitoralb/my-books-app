import httpMocks from 'node-mocks-http';
import { CreateUserValidation, DeleteUserValidation } from '../api/middlewares';
import { BadRequestError } from '../../../lib/errors/custom';


describe('User Validation Tests', () => {
    test('should throw BadRequestError when there\'s no password in request body', () => {
        let req = httpMocks.createRequest({
            method: 'POST',
            path: '/users',
            body: {
                email: 'user-test@library.com',
                name: 'user test'
            }
        });

        let validator = new CreateUserValidation();
        validator.setRequest = req;

        expect(() => validator.checkForPassword()).toThrow(BadRequestError);
    });

    test('should throw BadRequestError when there\'s no email in request body', () => {
        let req = httpMocks.createRequest({
            method: 'POST',
            path: '/users',
            body: {
                name: 'user test',
                password: 'stronguserpswd'
            }
        });

        let validator = new CreateUserValidation();
        validator.setRequest = req;

        expect(() => validator.checkForEmail()).toThrow(BadRequestError);
    });

    test('should throw BadRequestError when there\'s no name in request body', () => {
        let req = httpMocks.createRequest({
            method: 'POST',
            path: '/users',
            body: {
                email: 'user-test@library.com',
                password: 'stronguserpswd'
            }
        });

        let validator = new CreateUserValidation();
        validator.setRequest = req;

        expect(() => validator.checkForName()).toThrow(BadRequestError);
    });

    test('should return undefined when all data exists in request body', () => {
        let { req, res} = httpMocks.createMocks({
            method: 'POST',
            path: '/users',
            body: {
                email: 'user-test@library.com',
                name: 'user test',
                password: 'stronguserpswd'
            }
        }, {});

        let validator = new CreateUserValidation();

        expect(validator.checkAllInputs(req, res, () => {})).toBe(undefined);
    });

    test('should throw BadRequestError when there\'s no id in request params', () => {
        let { req, res } = httpMocks.createMocks({
            method: 'DELETE',
            path: '/users',
            params: {}
        }, {});

        let validator = new DeleteUserValidation();

        expect(() => validator.checkIdentification(req, res, () => {})).toThrow(BadRequestError);
    });
});
