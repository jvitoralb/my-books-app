import 'dotenv/config';
import fs from 'node:fs';
import { join } from 'node:path';
import jwt from 'jsonwebtoken';
import { AuthenticationError, ServerError } from '../errors/custom';

type Data = {
    id: string;
    email: string;
}
type Payload = {
    sub: string;
    email: string;
}
type Token = {
    token: string;
    expires: string;
}
type Validation = {
    valid: boolean;
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
        this.EXPIRES = '604800000';
    }

    public issue(data: Data): Token | undefined {
        const payload: Payload = {
            sub: data.id,
            email: data.email
        }
    
        try {
            const signature = this.signPayload(payload);
            
            return {
                token: signature,
                expires: this.EXPIRES
            }
        } catch(err) {
            // console.log(err);
            throw new ServerError('Internal Server Error', 'SERVER ERROR', 500, 'Token signature error');
        }
    }
    public decode(bearerToken: string): Payload {
        const [b, token] = bearerToken.split(' ');
        const decodedPayload: unknown = this.decodePayload(token);
        return this.verifyDecoded(decodedPayload);
    }
    public validate(authorizationHeader: string): Validation {
        const [ b, token ] = authorizationHeader.split(' ');

        if (b === 'Bearer' && token.match(/^\S+\.\S+\.\S+$/)) {
            this.decode(authorizationHeader);
            return { valid: true };
        }
        return { valid: false };
    }
    private signPayload(payload: Payload): string {
        const signed = jwt.sign(payload, this.PRIV_KEY, {
            expiresIn: this.EXPIRES,
            algorithm: 'RS256'
        });
    
        return signed;
    }
    private decodePayload(token: string): unknown {
        try {
            return jwt.verify(token, this.PUB_KEY, { algorithms: ['RS256'] });
        } catch(err) {
            if (err instanceof jwt.JsonWebTokenError) {
                throw new AuthenticationError('Not Authenticated', 'UNAUTHORIZED', 401);
            }
            if (err instanceof jwt.TokenExpiredError) {
                throw new AuthenticationError('Not Authorized', 'FORBIDDEN', 403);
            }
            throw err;
        }
    }
    private verifyDecoded(decoded: unknown): Payload {
        if (!(decoded instanceof Object)) {
            throw new AuthenticationError('Token payload error', 'UNAUTHORIZED', 401, 'Payload must be an object');
        }

        if (!(decoded!.hasOwnProperty('email')) || !(decoded!.hasOwnProperty('sub')) || !(decoded!.hasOwnProperty('iat'))) {
            throw new AuthenticationError('Token payload error', 'UNAUTHORIZED', 401, 'Missing required fields');
        }

        return decoded as Payload;
    }
}

export default AuthToken;