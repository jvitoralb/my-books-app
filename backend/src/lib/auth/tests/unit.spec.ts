import AuthToken from '../jwt';
import PasswordsHandler from '../password';
import { AuthenticationError } from '../../errors/custom';


describe('JWT Authentication', () => {
    const generatedToken = jest.fn();

    test('should issue a token and its age', () => {
        let issued = new AuthToken().issue({ id: 'test-jwt-user-id', email: 'test-user@books.app' });
        generatedToken(issued);

        expect(generatedToken).toHaveBeenCalledWith(
            expect.objectContaining({
                token: expect.stringMatching(/^\S+\.\S+\.\S+$/),
                expires: String(1000 * (60 * 60) * (24 * 7))
            })
        );
    });

    test('should successfully decode a token payload', () => {
        const authorizationHeader = 'Bearer ' + generatedToken.mock.lastCall[0].token;
        const auth = new AuthToken();

        expect(auth.decode(authorizationHeader)).toMatchObject(
            expect.objectContaining({
                sub: expect.stringMatching('test-jwt-user-id'),
                email: expect.stringMatching('test-user@books.app')
            })
        );
    });

    test('should throw error when decoding a invalid token payload', () => {
        const authorizationHeader = 'Bearer tHiS.1s.4-1nVAL1d-_toK3N';
        const auth = new AuthToken();

        expect(() => auth.decode(authorizationHeader))
        .toThrow(new AuthenticationError('Not Authenticated', 'UNAUTHORIZED', 401));
    });

    test('should successfully validate a token', () => {
        const authorizationHeader = 'Bearer ' + generatedToken.mock.lastCall[0].token;
        const auth = new AuthToken();

        expect(auth.validate(authorizationHeader).valid).toBe(true);
    });

    test('should return false for a invalid bearer token', () => {
        const authorizationHeader = 'eitHiS.1s.4-1nVAL1d-_toK3N';
        const auth = new AuthToken();

        expect(auth.validate(authorizationHeader).valid).toBe(false);
    });

    test('should throw error for a invalid token', () => {
        const authorizationHeader = 'Bearer eitHiS.1s.4-1nVAL1d-_toK3N';
        const auth = new AuthToken();

        expect(() => auth.validate(authorizationHeader).valid)
        .toThrow(new AuthenticationError('Not Authenticated', 'UNAUTHORIZED', 401));
    });
});

describe('Password Functions', () => {
    const mock = {
        pswd: 'strongpassword123',
        hash: '',
        salt: ''
    }
    const generatedHashAndSalt = jest.fn(({ hash, salt }) => {
        mock['hash'] = hash;
        mock['salt'] = salt;
    });

    test('should generate a hash and salt', () => {
        let handler = new PasswordsHandler(mock.pswd);
        generatedHashAndSalt(handler.generate());
        
        expect(generatedHashAndSalt).toHaveBeenCalledWith(
            expect.objectContaining({
                hash: expect.any(String),
                salt: expect.any(String),
            })
        );
    });

    test('should validate the password', () => {
        let handler = new PasswordsHandler(mock.pswd, mock.hash, mock.salt);
        expect(handler.validate()).toBeTruthy();
    });

    test('should return false for the wrong password', () => {
        let handler = new PasswordsHandler('321wrongpassword', mock.hash, mock.salt);
        expect(handler.validate()).toBeFalsy();
    });
});
