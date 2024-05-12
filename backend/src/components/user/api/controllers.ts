import { NextFunction, Request, Response } from 'express';
import UserService, { UserIdentification } from '../service/services';
import AuthToken from '../../../lib/auth/jwt';

interface Controller {
    read(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateEmail(req: Request, res: Response, next: NextFunction): Promise<void>;
    updatePswd(req: Request, res: Response, next: NextFunction): Promise<void>;
    delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}

class UserController implements Controller {
    private service: UserService;

    constructor() {
        this.service = new UserService();
    }

    read = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const bearerToken = req.get('Authorization');
            const payload = new AuthToken().decode(bearerToken!);

            const user = await this.service.searchUser({
                id: payload.sub,
                email: payload.email
            });

            res.status(200).json(user);
        } catch(err) {
            next(err);
        }
    }
    updateEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const bearerToken = req.get('Authorization');
            const payload = new AuthToken().decode(bearerToken!);
            const userIds: UserIdentification = {
                id: payload.sub,
                email: payload.email
            }

            const updatedUser = await this.service.changeEmail(userIds, req.body.new_email);

            res.status(200)
            .cookie('access_token', updatedUser.token, { maxAge: Number(updatedUser.expires) })
            .json(updatedUser);
        } catch(err) {
            next(err);
        }
    }
    updatePswd = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const bearerToken = req.get('Authorization');
            const payload = new AuthToken().decode(bearerToken!);
            const newPswd: string = req.body.new_password;

            await this.service.changePassword(payload.sub, newPswd);

            res.status(204).json();
        } catch(err) {
            next(err);
        }
    }
    delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const bearerToken = req.get('Authorization');
            const payload = new AuthToken().decode(bearerToken!);

            await this.service.destroyUser({
                id: payload.sub,
                email: payload.email
            });

            res.status(204).json();
        } catch(err) {
            next(err);
        }
    }
}

export default UserController;