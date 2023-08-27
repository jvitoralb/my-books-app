import { Request, Response, NextFunction } from 'express';
import BookService, { Book } from '../service/services';

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
            const bookInputs: Book = req.body;

            const newBook = await this.service.saveBook(bookInputs);
    
            res.status(201).json(newBook);
        } catch(err) {
            next(err);
        }
    }
    read = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const books = await this.service.searchBooks();
    
            res.status(200).json(books);
        } catch(err) {
            next(err);
        }
    }
    updateInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const bookData: Book = {
                ...req.body,
                id
            };

            await this.service.changeBookInfo(bookData);

            res.status(204).json();
        } catch(err) {
            next(err);
        }
    }
    updateSection = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const { section }: { section: string } = req.body;

            await this.service.changeBookSection(id, section);

            res.status(204).json();
        } catch(err) {
            next(err);
        }
    }
    delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;

            await this.service.destroyBook(id);

            res.status(204).json();
        } catch(err) {
            next(err);
        }
    }
}

export default BookController;