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
    validateUpdate(req: Request, res: Response, next: NextFunction): void;
    validateDelete(req: Request, res: Response, next: NextFunction): void;
}

class BookMiddleware extends CheckRequest implements Middleware {
    constructor() {
        super();
    }

    validateCreate = (req: Request, res: Response, next: NextFunction): void => {
        this.setRequest = req;

        this.checkForTitle();
    }
    validateDelete = (req: Request, res: Response, next: NextFunction): void => {
        this.setRequest = req;

        this.checkForId();
    }
    validateUpdate = (req: Request, res: Response, next: NextFunction): void => {
        this.setRequest = req;

        this.checkForId();
        this.checkForFields();
    }
}

export default BookMiddleware;