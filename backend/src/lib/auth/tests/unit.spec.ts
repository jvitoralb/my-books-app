import issueToken from '../jwt';
import auth from '../auth';
import { generatePassword, validatePassword } from '../password';


describe('JWT Authentication', () => {
    const generatedToken = jest.fn();

    test('should issue a token and its age', () => {
        let issued = issueToken({ _id: 'test-jwt-user-id', email: 'test-user@books.app' });
        generatedToken(issued);

        expect(generatedToken).toHaveBeenCalledWith(
            expect.objectContaining({
                token: expect.stringMatching(/Bearer\s\S+\.\S+\.\S+/),
                expires: '7d'
            })
        );
    });

    test('should successfully validate a token', () => {
        const authorizationHeader = generatedToken.mock.lastCall[0].token;
        expect(auth(authorizationHeader)).toBe(true);
    });

    test('should return false for a invalid token', () => {
        const authorizationHeader = 'Bearer tHiS.1s.4-1nVAL1d-_toK3N'
        expect(auth(authorizationHeader)).toBe(false);
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
        let hashAndSalt = generatePassword(mock.pswd);
        generatedHashAndSalt(hashAndSalt);
        
        expect(generatedHashAndSalt).toHaveBeenCalledWith(
            expect.objectContaining({
                hash: expect.any(String),
                salt: expect.any(String),
            })
        );
    });

    test('should validate the password', () => {
        let validPswd = validatePassword(mock.pswd, mock.hash, mock.salt);
        expect(validPswd).toBeTruthy();
    });

    test('should return false for the wrong password', () => {
        let invalidPswd = validatePassword('321wrongpassword', mock.hash, mock.salt);
        expect(invalidPswd).toBeFalsy();
    });
});