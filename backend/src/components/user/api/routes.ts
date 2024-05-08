import { Router } from 'express';
import UserController from './controllers';
import UserMiddleware from './middlewares';
import AuthMiddleware from '../../auth/api/middlewares';


const userRouter = Router();

userRouter.use(new AuthMiddleware().authenticateRequest);

userRouter.get('/', new UserController().read);
userRouter.delete('/', new UserController().delete);
userRouter.put('/email', new UserMiddleware().validateUpdateEmail, new UserController().updateEmail);
userRouter.put('/password', new UserMiddleware().validateUpdatePswd, new UserController().updatePswd);

export default userRouter;