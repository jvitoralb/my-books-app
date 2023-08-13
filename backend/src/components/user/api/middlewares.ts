import { Request } from 'express';
import { BadRequestError } from '../../../lib/errors/custom';

interface ValidateUserInputs {
    checkForId(): void
    checkForPassword(): void
    checkForEmail(): void
    checkForName(): void
}

class CheckRequestInputs implements ValidateUserInputs {
    req: Request;

    constructor(req: Request) {
        this.req = req;
    }

    checkForId(): void {
        const { id } = this.req.body;

        if (!id) {
            throw new BadRequestError('missing required field');
        }
    }
    checkForPassword(): void {
        const { password } = this.req.body;

        if (!password) {
            throw new BadRequestError('missing required field');
        }
    }
    checkForEmail(): void {
        const { email } = this.req.body;

        if (!email) {
            throw new BadRequestError('missing required field');
        }
    }
    checkForName(): void {
        const { name } = this.req.body;

        if (!name) {
            throw new BadRequestError('missing required field');
        }
    }
}

class CreateUserValidation extends CheckRequestInputs {
    constructor(req: Request) {
        super(req);
    }

    checkAllInputs(): void {
        this.checkForName();
        this.checkForEmail();
        this.checkForPassword();
    }
}

class DeleteUserValidation extends CheckRequestInputs {
    constructor(req: Request) {
        super(req);
    }
    checkForId(): void {
        const { id } = this.req.params;

        if (!id) {
            throw new BadRequestError('missing user id');
        }
    }
}

export {
    CreateUserValidation,
    DeleteUserValidation
}