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

    protected checkForTitle(): void {
        const { title } = this.req.body;

        if (!title) {
            throw new BadRequestError('Missing required field');
        }
    }
    protected checkForId(): void {
        const { id } = this.req.params;

        if (!id) {
            throw new BadRequestError('Missing params');
        }
    }
    protected checkForInfo(): void {
        const { title, author, about } = this.req.body;

        if (!title && !author && !about ) {
            throw new BadRequestError('Missing required field');
        }
    }
    protected checkForSection(): void {
        const { section } = this.req.body;

        if (!section) {
            throw new BadRequestError('Missing required field');
        }
    }
    protected checkForFields(): void {
        let validFields = 0;

        for(const prop in this.req.body) {
            if (this.req.body[prop]) {
                validFields++;
            }
        }

        if (!validFields) {
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
        this.checkForInfo();

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