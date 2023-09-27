import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from '@tanstack/react-query';
import { AxiosError } from 'axios';


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

export type LoginProps = {
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<UserAuth, AxiosError<ServerErrorMessage, any>>>;
    isError: boolean;
    error: AxiosError<ServerErrorMessage, any> | null;
    setCredentials: (inputName: string, inputValue: string) => void;
    validCredentials: boolean;
}
