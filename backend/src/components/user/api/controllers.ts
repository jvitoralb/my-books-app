import { NextFunction, Request, Response } from 'express';
import UserService from '../service/services';
import AuthToken from '../../../lib/auth/jwt';

interface UserInputs {
    email: string;
    name?: string;
    password: string;
}

interface Controller {
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    read(req: Request, res: Response, next: NextFunction): Promise<void>;
    readCredentials(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateEmail(req: Request, res: Response, next: NextFunction): Promise<void>;
    updatePswd(req: Request, res: Response, next: NextFunction): Promise<void>;
    delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}

class UserController implements Controller {
    private service: UserService;

    constructor() {
        this.service = new UserService();
    }

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { name, email, password }: UserInputs = req.body;
            
            this.service.setUserNameAndEmail = {
                name: name!,
                email: email
            }
            
            const newUser = await this.service.registerUser(password);

            res.status(201).json(newUser);
        } catch(err) {
            next(err);
        }
    }
    readCredentials = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { email, password }: UserInputs = req.body;
            
            this.service.setUserNameAndEmail = {
                name: '',
                email: email
            }
            
            const userAccess = await this.service.logUser(password);

            res.status(200).json(userAccess);
        } catch(err) {
            next(err);
        }
    }
    read = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const bearerToken = req.get('Authorization');
            const payload = new AuthToken().decode(bearerToken!);

            this.service.setUserNameAndEmail = { name: '', email: payload.email }
            const user = await this.service.searchUser(payload.sub);

            res.status(200).json(user);
        } catch(err) {
            console.log(err);
        }
    }
    updateEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const bearerToken = req.get('Authorization');
            const payload = new AuthToken().decode(bearerToken!);
            const newEmail: string = req.body.new_email;

            this.service.setUserNameAndEmail = { name: '', email: newEmail };
            const updatedUser = await this.service.changeEmail(payload.sub);

            res.status(200).json(updatedUser);
        } catch(err) {
            next(err);
        }
    }
    updatePswd = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const bearerToken = req.get('Authorization');
            const payload = new AuthToken().decode(bearerToken!);
            const newPswd: string = req.body.new_password;

            await this.service.changePassword({ id: payload.sub, password: newPswd });

            res.status(204).json();
        } catch(err) {
            next(err);
        }
    }
    delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const bearerToken = req.get('Authorization');
            const payload = new AuthToken().decode(bearerToken!);

            this.service.setUserNameAndEmail = { name: '', email: payload.email }
            await this.service.destroyUser(payload.sub);

            res.status(204).json();
        } catch(err) {
            console.log(err);
        }
    }
}

export default UserController;