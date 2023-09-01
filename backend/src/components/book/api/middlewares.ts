import { request, Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../../lib/errors/custom';


class CheckRequest {
    private req: Request;

    constructor() {
        this.req = request;
    }

    protected set setRequest(req: Request) {
        this.req = req;
    }

    protected checkForId(): void {
        const { id } = this.req.params;

        if (!id) {
            throw new BadRequestError('Missing params');
        }
    }
    protected checkForTitle(): void {
        const { title } = this.req.body;

        if (!title) {
            throw new BadRequestError('Missing required field');
        }
    }
    protected checkForAuthor(): void {
        const { author } = this.req.body;

        if (author === '' || author === undefined) {
            throw new BadRequestError('Missing required field');
        }
    }
    protected checkForAbout(): void {
        const { about } = this.req.body;

        if (about === '' || about === undefined) {
            throw new BadRequestError('Missing required field');
        }
    }
    protected checkForSection(): void {
        const { section } = this.req.body;

        if (section === '' || section === undefined) {
            throw new BadRequestError('Missing required field');
        }
    }
}

interface Middleware {
    validateCreate(req: Request, res: Response, next: NextFunction): void;
    validateUpdateInfo(req: Request, res: Response, next: NextFunction): void;
    validateUpdateSection(req: Request, res: Response, next: NextFunction): void;
    validateDelete(req: Request, res: Response, next: NextFunction): void;
}

class BookMiddleware extends CheckRequest implements Middleware {
    constructor() {
        super();
    }

    validateCreate = (req: Request, res: Response, next: NextFunction): void => {
        this.setRequest = req;

        this.checkForTitle();

        next();
    }
    validateDelete = (req: Request, res: Response, next: NextFunction): void => {
        this.setRequest = req;

        this.checkForId();

        next();
    }
    validateUpdateInfo = (req: Request, res: Response, next: NextFunction): void => {
        this.setRequest = req;

        this.checkForId();
        this.checkForTitle();
        this.checkForAuthor();
        this.checkForAbout();

        next();
    }
    validateUpdateSection = (req: Request, res: Response, next: NextFunction): void => {
        this.setRequest = req;

        this.checkForId();
        this.checkForSection();

        next();
    }
}

export default BookMiddleware;