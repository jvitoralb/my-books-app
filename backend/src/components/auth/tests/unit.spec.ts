import httpMocks from 'node-mocks-http';
import AuthMiddleware from '../api/middlewares';
import { AuthenticationError, BadRequestError } from '../../../lib/errors/custom';


describe('Authentication Middleware', () => {
    test('throws a BadRequestError when user credentials are missing', () => {
        let { req, res } = httpMocks.createMocks({
            method: 'POST',
            path: '/api/v1/users/login',
            body: { email: 'user.test@library.app' }
        }, {});
        let next = () => {};

        expect(() => new AuthMiddleware().validCredentials(req, res, next))
        .toThrow(new BadRequestError('Missing required field'));
    });

    test('throws BadRequestError when is missing data for creating a user', () => {
        let { req, res } = httpMocks.createMocks({
            method: 'POST',
            path: '/api/v1/users/register',
            body: {
                name: 'user test',
                password: 'strongpswd123'
            }
        }, {});
        let next = () => {};

        expect(() => new AuthMiddleware().validCreate(req, res, next))
        .toThrow(new BadRequestError('Missing required field'));
    });

    test('should return undefined for a valid a token', () => {
        let { req, res } = httpMocks.createMocks({
            headers: {
                authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0LXVzZXItYXV0aC1taWRkbGV3YXJlIiwiZW1haWwiOiJ0ZXN0X3VzZXJAYXV0aC5taWRkbGV3YXJlIiwiaWF0IjoxNjkxOTQzMDMzMjg3LCJleHAiOjE2OTE5NDM2MzgwODd9.nVBywl2Lz-Z0xzGSY07UCNAje8r5MhoWM3MIQTDJaguHZvpgqhzYPoenyc0a4UWO4kO5PrQEz2rL93ZEy9dKFKPkThaOSyaLGGwV0yQ1uPMhVSyGnW0DtljK0feugVuxgTq66ARBS-sA2PYJabpSQLP8fxp5DSqo6H52Qoc2PgGaoWtjoPFg4FiTu4k83Y7_zASYUySckF2cMC1p35WLXZvnp9L_6S3W_Cx_XSLICgpyp3mLTCnRyYXz-ICciaBNh3ynpi-xma4l2Twd1odeExvZ3cHHkwzqR4hf4bz81ao_H6Zterk5K9rNzBBRPA7PQZY5Aorz1hFD5hEn7XoVblT6svUwPerCxDZwtuWxnDEUpzy4p2-XHLGzZ9PS7nHYoDa0YUn3tASUioEVDSub-v6p0pZL16PCzY8jLNmvl8BuNFNLFrY8ckRbdAwAZMhurnqURpzXwNti-_uthdk4e6C8SwKDsSj0bzqWwIcy9PzlmT9zpCJ4J0k_Q3899LydYXr0cs4M3uWW-FZJGiRSR9aMXoz_M1T4EWTQTx4uJVUmf7aNHhaf1jniJUbDUOiBtxkAxpP3IuqQvo1iEV_J39Q3YpmBQjuhIZi9KcjjeinPWm23m7biMFrHil-ASsRik3Atp05yJlk6XYNDcbKnKgKgua7yJY_oRS09xDD7Y2c'
            }
        }, {});
        let next = () => {}
        
        expect(new AuthMiddleware().authenticateRequest(req, res, next)).toBe(undefined);
    });
    
    test('should throw AuthenticationError for a invalid token', () => {
        let { req, res } = httpMocks.createMocks({
            headers: {
                authorization: 'Bearer tH1s-1S.a-INv4liD.t0k3N'
            }
        });
        let next = () => {}
        
        expect(() => new AuthMiddleware().authenticateRequest(req, res, next)).toThrow(new AuthenticationError('Not Authorized', 'FORBIDDEN', 403));
    });

    test('should throw AuthenticationError when there\'s no token', () => {
        let { req, res } = httpMocks.createMocks({
            headers: {}
        });
        let next = () => {}
        
        expect(() => new AuthMiddleware().authenticateRequest(req, res, next)).toThrow(new AuthenticationError('Not Authenticated', 'UNAUTHORIZED', 401));
    });
});
