import { Router } from 'express';
import UserController from './controllers';
import { CreateUserValidation } from './middlewares';


const userRouter = Router();

userRouter.post('/users', new CreateUserValidation().checkAllInputs, new UserController().create);

export default userRouter;