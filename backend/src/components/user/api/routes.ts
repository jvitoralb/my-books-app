import { Router } from 'express';
import UserController from './controllers';
import { CreateUserValidation } from './middlewares';


const userRouter = Router();

userRouter.get('/users', new UserController().read);
userRouter.delete('/users', new UserController().delete);
userRouter.post('/users/login', new UserController().readCredentials);
userRouter.post('/users/register', new CreateUserValidation().checkAllInputs, new UserController().create);
userRouter.put('/users/email', new UserController().updateEmail);
userRouter.put('/users/password', new UserController().updatePswd);

export default userRouter;