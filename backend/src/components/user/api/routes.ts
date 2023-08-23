import { Router } from 'express';
import UserController from './controllers';
import UserMiddleware from './middlewares';


const userRouter = Router();

userRouter.post('/login', new UserMiddleware().validateReadCredentials, new UserController().readCredentials);
userRouter.post('/register', new UserMiddleware().validateCreate, new UserController().create);

userRouter.get('/', new UserController().read);
userRouter.delete('/', new UserController().delete);
userRouter.put('/email', new UserMiddleware().validateUpdateEmail, new UserController().updateEmail);
userRouter.put('/password', new UserMiddleware().validateUpdatePswd, new UserController().updatePswd);

export default userRouter;