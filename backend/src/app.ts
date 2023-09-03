import express, { Express } from 'express';
import userRouter from './components/user/api/routes';
import bookRouter from './components/book/api/routes';
import errorHandler from './lib/errors/handler';
import notFoundHandler from './lib/404/handler';


const app: Express = express();

app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/books', bookRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;