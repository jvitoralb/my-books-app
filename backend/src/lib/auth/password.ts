import crypto from 'node:crypto';


interface HashAndSalt {
    hash: string;
    salt: string;
}

interface PasswordUtils {
    generate(): HashAndSalt;
    validate(): boolean;
}

export class PasswordsHandler implements PasswordUtils {
    private pswd: crypto.BinaryLike;
    private hash: string;
    private salt: crypto.BinaryLike;

    constructor(pswd: crypto.BinaryLike, hash = '', salt = '') {
        this.pswd = pswd;
        this.hash = hash;
        this.salt = salt;
    }

    generate(): HashAndSalt {
        const salt = crypto.randomBytes(32).toString();
        const hash = crypto.pbkdf2Sync(this.pswd, salt, 20000, 64, 'sha512').toString();
    
        return {
            hash,
            salt
        }
    }

    validate(): boolean {
        const verify = crypto.pbkdf2Sync(this.pswd, this.salt, 20000, 64, 'sha512').toString();

        if (verify === this.hash) {
            return true;
        }
        return false;
    }
}

export default PasswordsHandler;