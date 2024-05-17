import { Request, Response, NextFunction } from 'express';
import AuthService, { UserRegisterAuthData, LoginAuthCredendials } from '../service/services';

interface AuthController {
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    read(req: Request, res: Response, next: NextFunction): Promise<void>;
}

class AuthController implements AuthController {
    private service: AuthService;

    constructor() {
        this.service = new AuthService();
    }

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const createUserData: UserRegisterAuthData = req.body;
            const newUser = await this.service.register(createUserData);
    
            res.status(201)
            .cookie('access_token', newUser.token, { maxAge: Number(newUser.expires) })
            .json({
                name: newUser.name,
                email: newUser.email,
            });
        } catch(err) {
            next(err);
        }
    }
    read = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userCredentials: LoginAuthCredendials = req.body;
            const userAccess = await this.service.login(userCredentials);

            res.status(204)
            .cookie('access_token', userAccess.token, { maxAge: Number(userAccess.expires) })
            .json();
        } catch(err) {
            next(err);
        }
    }
}

export default AuthController;