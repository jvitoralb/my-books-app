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

export type CustomAxiosError = AxiosError<ServerErrorMessage, any> | null

export type FieldsArray = ['email' | null, 'password' | null];

export type UseQueryRefetch = <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<UserAuth, AxiosError<ServerErrorMessage, any>>>;

export type LoginProps = {
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<UserAuth, AxiosError<ServerErrorMessage, any>>>;
    isError: boolean;
    error: CustomAxiosError;
    setCredentials: (inputName: string, inputValue: string) => void;
    isValid: boolean;
    fields: FieldsArray;
}

export type LoginFormProps = {
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<UserAuth, AxiosError<ServerErrorMessage, any>>>;
    isError: boolean;
    errorFields: FieldsArray;
    setCredentials: (inputName: string, inputValue: string) => void;
    isValid: boolean;
    fields: FieldsArray;
}

export type LoginInputSubject = 'email' | 'password';

export type InputControlProps = {
    subject: LoginInputSubject;
    setCredentials: (inputName: string, inputValue: string) => void;
    displayWarning: boolean;
    handleWarnings: (warnFields: FieldsArray | null) => void;
    subjectWarning: string;
}
