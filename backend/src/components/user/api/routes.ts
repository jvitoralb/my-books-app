import { Router } from 'express';
import UserController from './controllers';
import UserMiddleware from './middlewares';


const userRouter = Router();

userRouter.use(new UserMiddleware().validRequest);

userRouter.get('/', new UserController().read);
userRouter.delete('/', new UserController().delete);
userRouter.put('/email', new UserMiddleware().validUpdateEmail, new UserController().updateEmail);
userRouter.put('/password', new UserMiddleware().validUpdatePswd, new UserController().updatePswd);

export default userRouter;