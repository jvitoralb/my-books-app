import { UserAuth } from '../types';


const AUTH_KEY = 'u-auth';

export const setAuthData = (authData: UserAuth): void => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
}

export const getAuthData = (): UserAuth => {
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

export const delAuthData = (): void => {
    localStorage.removeItem(AUTH_KEY);
}
