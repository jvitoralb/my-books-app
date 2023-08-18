class AppError extends Error {
    name: string;
    statusCode: number;
    description: string;

    constructor(message: string, name: string, statusCode: number, description: string) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
        this.description = description;
    }
}

class AuthenticationError extends AppError {
    constructor(message: string, name: string, statusCode: number, description = '') {
        super(message, name, statusCode, description);
    }
}

class BadRequestError extends AppError {
    constructor(message: string, name = 'BAD REQUEST', statusCode = 400, description = '') {
        super(message, name, statusCode, description);
    }
}

class ServerError extends AppError {
    constructor(message = 'Internal Server Error', name = 'SERVER ERROR', statusCode = 500, description = '') {
        super(message, name, statusCode, description);
    }
}
export {
    BadRequestError,
    AuthenticationError,
    ServerError
};