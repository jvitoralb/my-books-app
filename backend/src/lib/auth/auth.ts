import fs from 'node:fs';
import { join } from 'node:path';
import jwt from 'jsonwebtoken';


const PUB_KEY = fs.readFileSync(join(process.cwd(), '/pub-key.pem'), 'utf8');

const auth = (authorizationHeader: String) => {
    const [ bearer, token ] = authorizationHeader.split(' ');

    if (bearer === 'Bearer' && token.match(/\S+\.\S+\.\S+/)) {
        try {
            jwt.verify(token, PUB_KEY, { algorithms: ['RS256'] });
            return true;
        } catch(err) {
            return false;
        }
    }

    return false;
}

export default auth;