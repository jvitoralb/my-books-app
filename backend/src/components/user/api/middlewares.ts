import { Request, request } from 'express';
import { BadRequestError } from '../../../lib/errors/custom';

interface ValidateUserInputs {
    checkForId(): void
    checkForPassword(): void
    checkForEmail(): void
    checkForName(): void
}

class CheckRequestInputs implements ValidateUserInputs {
    private req: Request;

    constructor() {
        this.req = request;
    }

    set setRequest(req: Request) {
        this.req = req;
    }

    get getRequest(): Request {
        return this.req;
    }

    checkForId(): void {
        const { id } = this.req.body;

        if (!id) {
            throw new BadRequestError('Missing required field');
        }
    }
    checkForPassword(): void {
        const { password } = this.req.body;

        if (!password) {
            throw new BadRequestError('Missing required field');
        }
    }
    checkForEmail(): void {
        const { email } = this.req.body;

        if (!email) {
            throw new BadRequestError('Missing required field');
        }
    }
    checkForName(): void {
        const { name } = this.req.body;

        if (!name) {
            throw new BadRequestError('Missing required field');
        }
    }
}

class CreateUserValidation extends CheckRequestInputs {
    constructor() {
        super();
    }

    checkAllInputs = (req: Request): void => {
        this.setRequest = req;

        this.checkForName();
        this.checkForEmail();
        this.checkForPassword();
    }
}

class DeleteUserValidation extends CheckRequestInputs {
    constructor() {
        super();
    }

    checkForId = (): void => {
        const { id } = this.getRequest.params;

        if (!id) {
            throw new BadRequestError('Missing params');
        }
    }

    checkIdentification = (req: Request): void => {
        this.setRequest = req;

        this.checkForId();
    }
}

export {
    CreateUserValidation,
    DeleteUserValidation
}