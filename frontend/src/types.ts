import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, UseMutateFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { HTMLInputTypeAttribute } from 'react';

/**
 * General Types
**/
export type ServerErrorMessage = {
    error: string
}
export type CustomAxiosError = AxiosError<ServerErrorMessage, any> | null
export type FieldsArray = ['email' | null, 'password' | 'confirm_password' | null];
export type UseQueryRefetch = <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<UserAuth, AxiosError<ServerErrorMessage, any>>>;

/**
 * Input Control Component related Types
**/
export type InputSubject = 'name' | 'email' | 'password' | 'confirm_password';
export type InputControlProps = {
    subject: InputSubject;
    inputType?: HTMLInputTypeAttribute;
    setFormState: (inputName: string, inputValue: string) => void;
    displayWarning: boolean;
    handleWarnings: (warnFields: FieldsArray | null) => void;
    subjectWarning: string;
}

/**
 * Login Component related Types
**/
export type LoginCredentials = {
    email: string;
    password: string;
}
export type LoginProps = {
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<UserAuth, AxiosError<ServerErrorMessage, any>>>;
    isLoadingRefetch: boolean;
    isError: boolean;
    error: CustomAxiosError;
    setCredentials: (inputName: string, inputValue: string) => void;
    isValid: boolean;
    fields: FieldsArray;
}
export type LoginFormProps = {
    refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<UserAuth, AxiosError<ServerErrorMessage, any>>>;
    isError: boolean;
    isLoadingRefetch: boolean;
    errorFields: FieldsArray;
    setCredentials: (inputName: string, inputValue: string) => void;
    isValid: boolean;
    fields: FieldsArray;
}

/**
 * Signup Component related Types
**/
export type SignupUserData = {
    name: string;
    email: string;
    password: string;
}
export type SignupData = {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
}
export type SignupProps = {
    mutate: UseMutateFunction<UserAuth, AxiosError<ServerErrorMessage, any>, SignupUserData, unknown>;
    isLoading: boolean;
    isError: boolean;
    error: CustomAxiosError;
    setSignupData: (name: string, value: string) => void;
    signupData: SignupData;
    isValid: boolean;
    fields: FieldsArray;
}
export type SignupFormProps = {
    mutate: UseMutateFunction<UserAuth, AxiosError<ServerErrorMessage, any>, SignupUserData, unknown>;
    isLoading: boolean;
    isError: boolean;
    errorFields: FieldsArray;
    signupData: SignupData;
    setSignupData: (name: string, value: string) => void;
    isValid: boolean;
    fields: FieldsArray;
}

/**
 * Auth related Types
**/

export type UserAuth = {
    token: string;
    expires: string;
}
export type User = {
    name: string;
    email: string;
}
