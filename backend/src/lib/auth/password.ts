import crypto from 'node:crypto';


const validatePassword = (password: crypto.BinaryLike, hash: String, salt: crypto.BinaryLike) => {
    const verify = crypto.pbkdf2Sync(password, salt, 20000, 64, 'sha512').toString();

    if (verify === hash) {
        return true;
    }
    return false;
}

const generatePassword = (password: crypto.BinaryLike) => {
    const salt = crypto.randomBytes(32).toString();
    const hash = crypto.pbkdf2Sync(password, salt, 20000, 64, 'sha512').toString();

    return {
        hash,
        salt
    }
}

export {
    generatePassword,
    validatePassword
};