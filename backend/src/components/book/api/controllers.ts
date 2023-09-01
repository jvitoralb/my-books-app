import { Request, Response, NextFunction } from 'express';
import BookService, { BookInfo, BookSection } from '../service/services';
import AuthToken from '../../../lib/auth/jwt';

interface Controller {
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    read(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateInfo(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateSection(req: Request, res: Response, next: NextFunction): Promise<void>;
    delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}

class BookController implements Controller {
    private service: BookService;

    constructor() {
        this.service = new BookService();
    }

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const bearerToken = req.get('Authorization')!;
            const userPayload = new AuthToken().decode(bearerToken);
            const bookInputs: BookInfo = req.body;

            const newBook = await this.service.saveBook(userPayload.sub, bookInputs);

            res.status(201).json(newBook);
        } catch(err) {
            next(err);
        }
    }
    read = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const bearerToken = req.get('Authorization')!;
            const userPayload = new AuthToken().decode(bearerToken);

            const books = await this.service.searchBooks(userPayload.sub);
    
            res.status(200).json(books);
        } catch(err) {
            next(err);
        }
    }
    updateInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const bearerToken = req.get('Authorization')!;
            const { sub } = new AuthToken().decode(bearerToken);
            const { id } = req.params;
            const newInfo: BookInfo = req.body;

            await this.service.changeBookInfo(id, sub, newInfo);

            res.status(204).json();
        } catch(err) {
            next(err);
        }
    }
    updateSection = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const bearerToken = req.get('Authorization')!;
            const { sub } = new AuthToken().decode(bearerToken);
            const { id } = req.params;
            const newSection: BookSection = req.body;
            
            await this.service.changeBookSection(id, sub, newSection);

            res.status(204).json();
        } catch(err) {
            next(err);
        }
    }
    delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const bearerToken = req.get('Authorization')!;
            const { sub } = new AuthToken().decode(bearerToken);
            const { id } = req.params;

            await this.service.destroyBook(id, sub);

            res.status(204).json();
        } catch(err) {
            next(err);
        }
    }
}

export default BookController;