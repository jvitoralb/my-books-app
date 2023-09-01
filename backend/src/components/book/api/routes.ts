import { Router } from 'express';
import BookController from './controllers';
import BookMiddleware from './middlewares';
import AuthMiddleware from '../../auth/api/middlewares';


const bookRouter = Router();

bookRouter.use(new AuthMiddleware().authenticateRequest);

bookRouter.post('/', new BookMiddleware().validateCreate, new BookController().create);
bookRouter.get('/', new BookController().read);
bookRouter.delete('/:id', new BookMiddleware().validateDelete , new BookController().delete);
bookRouter.put('/:id/info', new BookMiddleware().validateUpdateInfo, new BookController().updateInfo);
bookRouter.put('/:id/section', new BookMiddleware().validateUpdateSection, new BookController().updateSection);

export default bookRouter;