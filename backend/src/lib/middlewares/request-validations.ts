import { Request, request } from 'express';
import { BadRequestError } from '../errors/custom';


class RequestValidations {
    private req: Request;

    constructor() {
        this.req = request;
    }

    protected set setRequest(req: Request) {
        this.req = req;
    }
    protected get getRequest(): Request {
        return this.req;
    }

    protected checkForPassword(): void {
        const { password } = this.req.body;

        if (!password) {
            throw new BadRequestError('Missing required field');
        }
    }
    protected checkForEmail(): void {
        const { email } = this.req.body;

        if (!email) {
            throw new BadRequestError('Missing required field');
        }
    }
    protected checkForName(): void {
        const { name } = this.req.body;

        if (!name) {
            throw new BadRequestError('Missing required field');
        }
    }
    protected checkForNewEmail(): void {
        const { new_email } = this.req.body;

        if (!new_email) {
            throw new BadRequestError('Missing required field');
        }
    }
    protected checkForNewPassword(): void {
        const { new_password } = this.req.body;

        if (!new_password) {
            throw new BadRequestError('Missing required field');
        }
    }
}

export default RequestValidations;