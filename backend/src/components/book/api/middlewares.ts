import { request, Request, Response, NextFunction } from 'express';
import { AuthenticationError, BadRequestError } from '../../../lib/errors/custom';
import AuthToken from '../../../lib/auth/jwt';


class BookRequestValidations {
    private req: Request;

    constructor() {
        this.req = request;
    }

    protected set setRequest(req: Request) {
        this.req = req;
    }
    protected checkToken(): void {
        const authToken = this.req.get('Authorization');

        if (!authToken) {
            throw new AuthenticationError('Not Authenticated', 'UNAUTHORIZED', 401);
        }

        const authorized = new AuthToken().validate(authToken);

        if (!authorized.valid) {
            throw new AuthenticationError('Not Authenticated', 'UNAUTHORIZED', 401);
        }
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
    validRequest(req: Request, res: Response, next: NextFunction): void;
    validCreate(req: Request, res: Response, next: NextFunction): void;
    validUpdateInfo(req: Request, res: Response, next: NextFunction): void;
    validUpdateSection(req: Request, res: Response, next: NextFunction): void;
    validDelete(req: Request, res: Response, next: NextFunction): void;
}

class BookMiddleware extends BookRequestValidations implements Middleware {
    constructor() {
        super();
    }
    validRequest = (req: Request, res: Response, next: NextFunction) => {
        this.setRequest = req;

        this.checkToken();

        next();
    }
    validCreate = (req: Request, res: Response, next: NextFunction): void => {
        this.setRequest = req;

        this.checkForTitle();

        next();
    }
    validUpdateInfo = (req: Request, res: Response, next: NextFunction): void => {
        this.setRequest = req;

        this.checkForId();
        this.checkForTitle();
        this.checkForAuthor();
        this.checkForAbout();

        next();
    }
    validUpdateSection = (req: Request, res: Response, next: NextFunction): void => {
        this.setRequest = req;

        this.checkForId();
        this.checkForSection();

        next();
    }
    validDelete = (req: Request, res: Response, next: NextFunction): void => {
        this.setRequest = req;

        this.checkForId();

        next();
    }
}

export default BookMiddleware;