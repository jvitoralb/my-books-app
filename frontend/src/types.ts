export type LoginCredentials = {
    email: string;
    password: string;
}

export type UserAuth = {
    token: string;
    expires: string;
}

export type User = {
    name: string;
    email: string;
}

export type SignupUserData = {
    name: string;
    email: string;
    password: string;
}

export type ServerErrorMessage = {
    error: string
}
