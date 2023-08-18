import { Router } from 'express';
import UserController from './controllers';
import { CreateUserValidation } from './middlewares';


const userRouter = Router();

userRouter.post('/users', new CreateUserValidation().checkAllInputs, new UserController().create);
userRouter.delete('/users', new UserController().delete);
userRouter.put('/users/email', new UserController().updateEmail);
userRouter.put('/users/password', new UserController().updatePswd);

export default userRouter;