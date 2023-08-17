import 'dotenv/config'
import fs from 'node:fs';
import { join } from 'node:path';
import jwt from 'jsonwebtoken';

interface Data {
    id: String
    email: String
}
interface Payload {
    sub: String
    email: String
    iat: Number
}
interface Token {
    token: string;
    expires: string;
}
interface Authentication { 
    issue(data: Data): Token | undefined;
    validate(authorizationHeader: string): boolean;
}

class AuthToken implements Authentication {
    private PUB_KEY: string
    private PRIV_KEY: string
    private EXPIRES: string;

    constructor() {
        this.PRIV_KEY = String(process.env.PRIVATE_KEY);
        this.PUB_KEY = fs.readFileSync(join(process.cwd(), '/pub-key.pem'), 'utf8');
        this.EXPIRES = '7d';
    }

    public issue(data: Data): Token | undefined {
        const payload: Payload = {
            sub: data.id,
            email: data.email,
            iat: Date.now()
        }
    
        try {
            const signature = this.signature(payload);
            
            return {
                token: 'Bearer ' + signature,
                expires: this.EXPIRES
            }
        } catch(err) {
            console.log(err);
        }
    }
    private signature(payload: Payload): string {
        const signed = jwt.sign(payload, this.PRIV_KEY, {
            expiresIn: this.EXPIRES,
            algorithm: 'RS256'
        });
    
        return signed;
    }
    public validate(authorizationHeader: string): boolean {
        const [ bearer, token ] = authorizationHeader.split(' ');

        if (bearer === 'Bearer' && token.match(/\S+\.\S+\.\S+/)) {
            try {
                jwt.verify(token, this.PUB_KEY, { algorithms: ['RS256'] });
                return true;
            } catch(err) {
                return false;
            }
        }
    
        return false;
    }
}

export default AuthToken;