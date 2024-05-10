import { Router } from 'express';
import BookController from './controllers';
import BookMiddleware from './middlewares';


const bookRouter = Router();

bookRouter.use(new BookMiddleware().validRequest);

bookRouter.post('/', new BookMiddleware().validCreate, new BookController().create);
bookRouter.get('/', new BookController().read);
bookRouter.delete('/:id', new BookMiddleware().validDelete , new BookController().delete);
bookRouter.put('/:id/info', new BookMiddleware().validUpdateInfo, new BookController().updateInfo);
bookRouter.put('/:id/section', new BookMiddleware().validUpdateSection, new BookController().updateSection);

export default bookRouter;