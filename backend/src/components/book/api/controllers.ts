import { Request, Response, NextFunction } from 'express';
import BookService, { Book } from '../service/services';

interface BookInputs {
    title: string;
    author?: string;
    about?: string;
    section?: string;
}

interface Controller {
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
}

class BookController implements Controller {
    private service: BookService;

    constructor() {
        this.service = new BookService();
    }

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const bookInputs: Book = req.body;

        const newBook = await this.service.saveBook(bookInputs);

        res.status(201).json(newBook);
    }
}

export default BookController;