import express, { Express } from 'express';
import userRouter from './components/user/api/routes';
import errorHandler from './lib/errors/handler';


const app: Express = express();

app.use(express.json());

app.use('/api/v1/users', userRouter);

app.use(errorHandler);

export default app;