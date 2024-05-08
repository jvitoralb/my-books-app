import Repository from '../database/repository';
import PasswordsHandler from '../../../lib/auth/password';
import { BadRequestError } from '../../../lib/errors/custom';
import AuthToken from '../../../lib/auth/jwt';

type RegisterUserData = {
    name: string;
    email: string;
    pswdHashSalt: {
        hash: string;
        salt: string;
    }
}
type LoginCredentials = {
    email: string;
}
export type UserIdentification = {
    id: string;
    email: string;
}
export type UserAccessData = {
    token: string;
    expires: string;
}

interface Service {
    registerUser(registerData: RegisterUserData): Promise<User>;
    loginUser(userCredentials: LoginCredentials): Promise<User>;
    searchUser(userIds: UserIdentification): Promise<{ name: string; email: string; }>;
    changeEmail(userIds: UserIdentification, newEmail: string): Promise<UserAccessData>;
    changePassword(id: string, password: string): Promise<void>;
    destroyUser(userIds: UserIdentification): Promise<void>;
}
interface User {
    id: string;
    email: string;
    name: string;
    pswd_hash: string;
    pswd_salt: string;
    created_at: Date;
    updated_at: Date;
    last_access: Date | null;
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
    private created_at: Date;
    private updated_at: Date;
    private last_access: Date | null;

    constructor() {
        this.id = '';
        this.email = '';
        this.name = '';
        this.pswd_hash = '';
        this.pswd_salt = '';
        this.created_at = new Date();
        this.updated_at = new Date();
        this.last_access = null;
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

    public get getUser(): User {
        return {
            id: this.id,
            email: this.email,
            name: this.name,
            pswd_hash: this.pswd_hash,
            pswd_salt: this.pswd_salt,
            created_at: this.created_at,
            updated_at: this.updated_at,
            last_access: this.last_access
        };
    }
}

class UserService extends UserData implements Service {
    private repository: Repository;

    constructor() {
        super();
        this.repository = new Repository();
    }

    registerUser = async ({ name, email, pswdHashSalt }: RegisterUserData): Promise<User> => {
        this.setPswd = pswdHashSalt;
        this.setEmail = email;
        this.setName = name;

        return await this.repository.insert(this.getUser);
    }
    loginUser = async ({ email }: LoginCredentials): Promise<User> => {
        this.setEmail = email;

        return await this.repository.findDocument(this.getUser);
    }
    searchUser = async ({ id, email }: UserIdentification): Promise<{ name: string; email: string; }> => {
        this.setId = id;
        this.setEmail = email;

        return await this.repository.find(this.getUser);
    }
    changeEmail = async ({ id, email }: UserIdentification, newEmail: string): Promise<UserAccessData> => {
        this.setId = id;
        this.setEmail = email;

        const updatedDoc = await this.repository.updateEmail(this.getUser, newEmail);
        const tokenInfo = new AuthToken().issue({
            id: updatedDoc.id,
            email: updatedDoc.email
        })!;

        return {
            token: tokenInfo.token,
            expires: tokenInfo.expires
        };
    }
    changePassword = async (id: string, password: string): Promise<void> => {
        const newPswdHashSalt = new PasswordsHandler(password).generate();

        this.setId = id;
        this.setPswd = newPswdHashSalt;

        await this.repository.updatePswd(this.getUser);
    }
    destroyUser = async ({ id, email }: UserIdentification): Promise<void> => {
        this.setId = id;
        this.setEmail = email;

        await this.repository.delete(this.getUser);
    }
}

export default UserService;