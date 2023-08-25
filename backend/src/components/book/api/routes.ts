import { Router } from 'express';
import BookController from './controllers';


const bookRouter = Router();

bookRouter.post('/', new BookController().create);


export default bookRouter;