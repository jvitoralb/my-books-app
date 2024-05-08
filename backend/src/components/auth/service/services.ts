import AuthToken from '../../../lib/auth/jwt';
import PasswordsHandler from '../../../lib/auth/password';
import { BadRequestError } from '../../../lib/errors/custom';
import UserService, { UserAccessData } from '../../user/service/services';

export type UserAuthData = UserAccessData;
export type UserRegisterAuthData = {
    name: string;
    email: string;
    password: string;
};
export type LoginAuthCredendials = {
    email: string;
    password: string;
};

interface AuthenticationServices {
    register(userData: UserRegisterAuthData): Promise<UserAuthData>;
    login(userCredentials: LoginAuthCredendials): Promise<UserAuthData>;
}

class AuthService implements AuthenticationServices {
    private userService: UserService;
    private authentication: AuthToken;

    constructor() {
        this.authentication = new AuthToken();
        this.userService = new UserService();
    }

    async register({ name, email, password }: UserRegisterAuthData): Promise<UserAuthData> {
        const pswdHashSalt = new PasswordsHandler(password).generate();

        const insertedUserDoc = await this.userService.registerUser({
            name,
            email,
            pswdHashSalt,
        });

        const tokenInfo = this.authentication.issue({
            id: insertedUserDoc.id,
            email: insertedUserDoc.email
        })!;

        return {
            token: tokenInfo.token,
            expires: tokenInfo.expires
        };
    }
    async login({ email, password }: LoginAuthCredendials): Promise<UserAuthData> {
        const userDoc = await this.userService.loginUser({ email });

        const validPswd = new PasswordsHandler(password, userDoc.pswd_hash, userDoc.pswd_salt).validate();

        if (!validPswd) {
            throw new BadRequestError('Invalid password');
        }

        const tokenInfo = this.authentication.issue({
            id: userDoc.id,
            email: userDoc.email 
        })!;

        return {
            token: tokenInfo.token,
            expires: tokenInfo.expires
        };
    }
}

export default AuthService;