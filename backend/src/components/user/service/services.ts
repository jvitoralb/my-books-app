import Repository from '../database/repository';
import { generatePassword } from '../../../lib/auth/password';
import AuthToken from '../../../lib/auth/jwt';

interface ReturnData {
    token: string;
    expires: string;
}

interface Service {
    registerUser(password: string): Promise<ReturnData>;
}

export interface User {
    id: string;
    email: string;
    name: string;
    pswd_hash: string;
    pswd_salt: string;
}

interface UserAccessor {
    getUser: User;
}

class UserData implements UserAccessor {
    private id: string;
    private email: string;
    private name: string;
    private pswd_hash: string;
    private pswd_salt: string;

    constructor() {
        this.id = '';
        this.email = '';
        this.name = '';
        this.pswd_hash = '';
        this.pswd_salt = '';
    }

    protected set setPswd(pswdHS: { hash: string; salt: string; }) {
        this.pswd_hash = pswdHS.hash;
        this.pswd_salt = pswdHS.salt;
    }
    protected set setId(id: string) {
        this.id = id;
    }
    protected set setName(name: string) {
        this.name = name;
    }
    protected set setEmail(email: string) {
        this.email = email;
    }

    public set setUserNameAndEmail(data: { name: string; email: string; }) {
        this.setName = data.name;
        this.setEmail = data.email;
    }

    public get getUser(): User {
        return {
            id: this.id,
            email: this.email,
            name: this.name,
            pswd_hash: this.pswd_hash,
            pswd_salt: this.pswd_salt
        };
    }
}

class UserService extends UserData implements Service {
    private repository: Repository;

    constructor() {
        super();
        this.repository = new Repository();
    }

    registerUser = async (password: string): Promise<ReturnData> => {
        const pswdHashSalt = generatePassword(password);

        this.setPswd = pswdHashSalt;

        const insertedDoc = await this.repository.insert(this.getUser);
        const tokenInfo = new AuthToken().issue({ id: String(insertedDoc!.id), email: this.getUser.email });

        return {
            token: tokenInfo!.token,
            expires: tokenInfo!.expires
        };
    }
}

export default UserService;