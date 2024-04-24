import { redirect } from 'react-router-dom';
import { UserAuth } from '../types';


const AUTH_KEY = 'u-auth';

const setAuthData = (authData: UserAuth): void => {
    const userAuth: UserAuth = {
        token: '',
        expires: ''
    }
    let expireTime = (1000 * 60 * 60 * 24 * Number(authData.expires.split('')[0]));
    let todayTime = Date.now();

    userAuth.expires = String(todayTime + expireTime);
    userAuth.token = authData.token;
    localStorage.setItem(AUTH_KEY, JSON.stringify(userAuth));
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
        const expired: boolean = (() => {
            if (!data.expires) {
                return true;
            }
            if (Number(data.expires) > Date.now()) {
                return false;
            }
            return true;
        })();

        if (!data.token || expired) {
            finishSession();
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
