import crypto from 'node:crypto';
import fs from 'node:fs';


const generateKeyPairs = () => {
    const keys = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        }
    });
    fs.writeFileSync(process.cwd() + '/pub-key.pem', keys.publicKey);
    fs.writeFileSync(process.cwd() + '/priv-key.pem', keys.privateKey);
}

generateKeyPairs();