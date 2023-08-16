import { NextFunction, Request, Response } from 'express';
import UserService from '../service/services';

interface UserInputs {
    id?: string;
    email: string;
    name?: string;
    password: string;
}

interface Controller {
    create(req: Request, res: Response, next: NextFunction): Promise<void>
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
}

export default UserController;