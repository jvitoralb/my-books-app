import { redirect } from 'react-router-dom';
import { UserAuth } from '../types';


const AUTH_KEY = 'u-auth';

const setAuthData = (authData: UserAuth): void => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
}

const getAuthData = (): UserAuth => {
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

const delAuthData = (): void => {
    localStorage.removeItem(AUTH_KEY);
}

const handleAuth = () => {
    const startSession = (auth: UserAuth) => {
        setAuthData(auth);
    }
    const finishSession = () => {
        delAuthData();
    }
    const isAuth = () => {
        if (getAuthData().token) {
            return true;
        }
        return false;
    }
    const getToken = () => {
        return getAuthData().token;
    }
    const requireAuth = (customPath?: string) => {
        const data = getAuthData();
        // const expired = false;

        if (!data.token) {
            let path = customPath ? customPath : '/login';
            throw redirect(path);
        }
    }

    return {
        isAuth: isAuth,
        getToken: getToken,
        startSession: startSession,
        finishSession: finishSession,
        requireAuth: requireAuth,
    }
}

export default handleAuth;
