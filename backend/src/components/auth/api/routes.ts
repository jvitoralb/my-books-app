import { Router } from 'express';
import AuthController from './controllers';
import AuthMiddleware from './middlewares';


const authRouter = Router();

authRouter.post('/login', new AuthMiddleware().validCredentials, new AuthController().read);
authRouter.post('/register', new AuthMiddleware().validCreate, new AuthController().create);

export default authRouter;