import { MutationStatus, QueryObserverResult, RefetchOptions, RefetchQueryFilters, UseMutateFunction } from '@tanstack/react-query';
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
export type BooksUseQueryRefetch = <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<BookNote[], unknown>>;

/**
 * Input Control Component related Types
**/
export type InputSubject = 'name' | 'email' | 'new_email' | 'confirm_new_email' | 'password' | 'confirm_password' | 'new_password' | 'confirm_new_password';
export type InputControlProps = {
    subject: InputSubject;
    value?: string;
    inputType?: HTMLInputTypeAttribute;
    setFormState: (inputName: string, inputValue: string) => void;
    displayWarning: boolean;
    handleWarnings: ((warnFields: FieldsArray | null) => void) | ((warnFields: FieldsArrayEmails | null) => void) | ((warnFields: FieldsArrayPswd | null) => void);
    subjectWarning: string;
    customText?: string;
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

/**
 * Settings Component related Types
**/

export type FieldsArrayEmails = ['email' | null, 'confirm_email' | null];
export type EmailUpdates = {
    // email: string;
    new_email: string;
}
type EmailStateValues = {
    // email: string;
    new_email: string;
    confirm_new_email: string;
}
export type EmailSettings = {
    stateValues: EmailStateValues;
    setEmailValues: (name: string, value: string) => void;
    isValid: boolean;
    fields: FieldsArrayEmails;
    sendUpdates: (updates: EmailUpdates) => void;
    status: MutationStatus;
    error: CustomAxiosError;
}

export type PasswordUpdates = {
    new_password: string;
}
type PasswordStateValues = {
    new_password: string;
    confirm_new_password: string;
}
export type FieldsArrayPswd = ['password' | null, 'confirm_password' | null];
export type PasswordSettings = {
    stateValues: PasswordStateValues;
    setPswdValues: (name: string, value: string) => void;
    isValid: boolean;
    fields: FieldsArrayPswd;
    sendUpdates: (updates: PasswordUpdates) => void;
    status: MutationStatus;
    error: CustomAxiosError;
}

/**
 * Home Component related Types
**/
export type BookNote = {
    id: string;
    user_id: string;
    title: string;
    author: null | string;
    about: string;
    section: null | string;
    created_at: string;
}
export type BookNoteProps = {
    notes: BookNote[];
    createBookNote: () => void;
    createStatus: MutationStatus;
    newNote: BookNote | undefined;
    selectNote?: (id: string) => void;
    selectedUpdateNote?: BookNote | null;
    selectedDeleteNote?: BookNote | null;
    updateBookNote: (id: string) => void;
    updateStatus: MutationStatus;
    deleteBookNote: (id: string) => void;
    deleteStatus: MutationStatus;
}
export type BookInfo = {
    title: string;
    author?: string;
    about?: string;
}
export type BookInfoUpdates = {
    id: string;
    title: string;
    author: string | null;
    about: string | null;
}

/**
 * EditableElements Component related Types
**/
export type EditableTextAreaAttr = {
    maxLength?: number;
    height?: string;
    minHeight?: string;
    maxHeight?: string;
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    numberOfLines?: number[];
    refObserver?: React.RefObject<HTMLTextAreaElement>;
}

export type EditableInputAttr = {
    maxLength?: number;
    height?: string;
    minHeight?: string;
    maxHeight?: string;
    width?: string;
    minWidth?: string;
    maxWidth?: string;
}
