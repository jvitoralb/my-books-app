import Repository from '../database/repository';
import PasswordsHandler from '../../../lib/auth/password';
import AuthToken from '../../../lib/auth/jwt';
import { BadRequestError } from '../../../lib/errors/custom';

export type RegisterUserData = {
    name: string;
    email: string;
    password: string;
}
export type LoginCredentials = {
    email: string;
    password: string;
}
export type UserIdentification = {
    id: string;
    email: string;
}
type UserAccessData = {
    token: string;
    expires: string;
}

interface Service {
    registerUser(registerData: RegisterUserData): Promise<UserAccessData>;
    logUser(userCredentials: LoginCredentials): Promise<UserAccessData>;
    searchUser(userIds: UserIdentification): Promise<{ name: string; email: string; }>;
    changeEmail(userIds: UserIdentification): Promise<UserAccessData>;
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

    registerUser = async ({ name, email, password }: RegisterUserData): Promise<UserAccessData> => {
        const pswdHashSalt = new PasswordsHandler(password).generate();

        this.setPswd = pswdHashSalt;
        this.setEmail = email;
        this.setName = name;

        const insertedDoc = await this.repository.insert(this.getUser);
        const tokenInfo = new AuthToken().issue({
            id: String(insertedDoc.id),
            email: this.getUser.email
        })!;

        return {
            token: tokenInfo.token,
            expires: tokenInfo.expires
        };
    }
    logUser = async ({ email, password }: LoginCredentials): Promise<UserAccessData> => {
        this.setEmail = email;

        const userDoc = await this.repository.findDocument(this.getUser);
        const validPswd = new PasswordsHandler(password, userDoc.pswd_hash, userDoc.pswd_salt).validate();

        if (!validPswd) {
            throw new BadRequestError('Invalid password');
        }

        const tokenInfo = new AuthToken().issue({
            id: userDoc.id,
            email: userDoc.email
        })!;

        return {
            token: tokenInfo.token,
            expires: tokenInfo.expires
        };
    }
    searchUser = async ({ id, email }: UserIdentification): Promise<{ name: string; email: string; }> => {
        this.setId = id;
        this.setEmail = email;

        return await this.repository.find(this.getUser);
    }
    changeEmail = async ({ id, email }: UserIdentification): Promise<UserAccessData> => {
        this.setId = id;
        this.setEmail = email;

        const updatedDoc = await this.repository.updateEmail(this.getUser);
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