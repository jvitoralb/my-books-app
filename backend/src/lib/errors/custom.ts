class AppError extends Error {
    name: string;
    statusCode: number;

    constructor(message: string, name: string, statusCode: number) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
    }
}

class AuthenticationError extends AppError {
    constructor(message: string, name: string, statusCode: number) {
        super(message, name, statusCode);
    }
}

class BadRequestError extends AppError {
    constructor(message: string, name = 'BAD REQUEST', statusCode = 400) {
        super(message, name, statusCode);
    }
}

export {
    BadRequestError,
    AuthenticationError
};