import { Router } from 'express';
import UserController from './controllers';
import UserMiddleware from './middlewares';


const userRouter = Router();

userRouter.post('/users/login', new UserMiddleware().validateReadCredentials, new UserController().readCredentials);
userRouter.post('/users/register', new UserMiddleware().validateCreate, new UserController().create);

userRouter.get('/users', new UserController().read);
userRouter.delete('/users', new UserController().delete);
userRouter.put('/users/email', new UserMiddleware().validateUpdateEmail, new UserController().updateEmail);
userRouter.put('/users/password', new UserMiddleware().validateUpdatePswd, new UserController().updatePswd);

export default userRouter;