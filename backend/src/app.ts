import express, { Express } from 'express';
import authRouter from './components/auth/api/routes';
import userRouter from './components/user/api/routes';
import bookRouter from './components/book/api/routes';
import errorHandler from './lib/errors/handler';
import notFoundHandler from './lib/404/handler';
import cors from 'cors';


const app: Express = express();

const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin']
}

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/books', bookRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;