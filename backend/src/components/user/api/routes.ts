import { Router } from 'express';
import UserController from './controllers';


const userRouter = Router();
const users = new UserController();

userRouter.post('/users', users.create);

export default userRouter;