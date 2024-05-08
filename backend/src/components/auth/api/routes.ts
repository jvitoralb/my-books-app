import { Router } from 'express';
import AuthController from './controllers';


const authRouter = Router();

authRouter.post('/login', new AuthController().read);
authRouter.post('/register', new AuthController().create);

export default authRouter;