import { Router } from 'express';
import BookController from './controllers';


const bookRouter = Router();

bookRouter.post('/', new BookController().create);
bookRouter.get('/', new BookController().read);
bookRouter.delete('/:id', new BookController().delete);
bookRouter.put('/:id/info', new BookController().updateInfo);
bookRouter.put('/:id/section', new BookController().updateSection);


export default bookRouter;