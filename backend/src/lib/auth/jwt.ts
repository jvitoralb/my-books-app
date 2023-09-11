import 'dotenv/config'
import fs from 'node:fs';
import { join } from 'node:path';
import jwt from 'jsonwebtoken';
import { AuthenticationError, ServerError } from '../errors/custom';

interface Data {
    id: string;
    email: string;
}
interface Payload {
    sub: string;
    email: string;
}
interface Token {
    token: string;
    expires: string;
}
interface Validation {
    valid: boolean;
    description?: string;
}
interface Authentication {
    issue(data: Data): Token | undefined;
    validate(authorizationHeader: string): Validation;
    decode(bearerToken: string): jwt.JwtPayload | string;
}

class AuthToken implements Authentication {
    private PUB_KEY: string;
    private PRIV_KEY: string;
    private EXPIRES: string;

    constructor() {
        this.PRIV_KEY = String(process.env.PRIVATE_KEY);
        this.PUB_KEY = fs.readFileSync(join(process.cwd(), '/pub-key.pem'), 'utf8');
        // this.EXPIRES = '60s';
        this.EXPIRES = '7d';
    }

    public issue(data: Data): Token | undefined {
        const payload: Payload = {
            sub: data.id,
            email: data.email
        }
    
        try {
            const signature = this.signPayload(payload);
            
            return {
                token: 'Bearer ' + signature,
                expires: this.EXPIRES
            }
        } catch(err) {
            console.log(err);
            throw new ServerError('Internal Server Error', 'SERVER ERROR', 500, 'Token signature error');
        }
    }
    private signPayload(payload: Payload): string {
        const signed = jwt.sign(payload, this.PRIV_KEY, {
            expiresIn: this.EXPIRES,
            algorithm: 'RS256'
        });
    
        return signed;
    }
    public decode(bearerToken: string): Payload {
        const [b, token] = bearerToken.split(' ');

        const decoded: unknown = jwt.verify(token, this.PUB_KEY, { algorithms: ['RS256'] });
        const decodedPayload: Payload = this.verifyDecoded(decoded);

        return decodedPayload;
    }
    private verifyDecoded(decoded: unknown): Payload {
        if (!(decoded instanceof Object)) {
            throw new AuthenticationError('Decoded token error', 'UNAUTHORIZED', 401, 'Token must be an object');
        }

        if (!(decoded!.hasOwnProperty('email')) || !(decoded!.hasOwnProperty('sub')) || !(decoded!.hasOwnProperty('iat'))) {
            throw new AuthenticationError('Decoded token error', 'UNAUTHORIZED', 401, 'Missing required field in decoded token');
        }

        return decoded as Payload;
    }
    public validate(authorizationHeader: string): Validation {
        const [ bearer, token ] = authorizationHeader.split(' ');

        if (bearer === 'Bearer' && token.match(/\S+\.\S+\.\S+/)) {
            try {
                jwt.verify(token, this.PUB_KEY, { algorithms: ['RS256'] });
                return { valid: true };
            } catch(err) {
                let validation: Validation = { valid: false }

                if (err instanceof jwt.TokenExpiredError) {
                    validation.description = 'Token expired';
                }
                return validation;
            }
        }
        return { valid: false };
    }
}

export default AuthToken;