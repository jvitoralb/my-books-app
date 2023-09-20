import { UserAuth } from '../types';


const AUTH_KEY = 'u-auth';

export const setAuthToken = (authData: UserAuth): void => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
}

export const getAuthToken = (): UserAuth => {
    let storageItem = localStorage.getItem(AUTH_KEY);

    if (typeof storageItem === 'string') {
        let authData: UserAuth = JSON.parse(storageItem);
        return authData;
    }
    return {
        token: '',
        expires: ''
    };
}

export const delAuthToken = (): void => {
    localStorage.removeItem(AUTH_KEY);
}
