import 'dotenv/config'
import jwt from 'jsonwebtoken';

interface Data {
    _id: String
    email: String
}
interface Payload {
    sub: String
    email: String
    iat: Number
}

const generateSignature = (payload: Payload) => {
    const PRIVATE_KEY = String(process.env.PRIVATE_KEY);
    const expiresIn = '7d';
    const algorithm = 'RS256';
    const signed = jwt.sign(payload, PRIVATE_KEY, { expiresIn, algorithm });

    return {
        signature: signed,
        age: expiresIn
    }
}

const issueToken = ({ _id, email }: Data) => {
    const payload: Payload = {
        sub: _id,
        email: email,
        iat: Date.now()
    }

    try {
        const { signature, age } = generateSignature(payload);
        
        return {
            token: 'Bearer ' + signature,
            expires: age
        }
    } catch(err) {
        console.log(err);
    }
}

export default issueToken;