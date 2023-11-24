import { useEffect, useState } from 'react';
import { delAuthData, getAuthData, setAuthData } from '../utils/auth';
import { UserAuth } from '../types';

type AuthState = {
    isAuth: boolean;
    token: string;
}

const useAuth = (userAuth?: UserAuth) => {
    const [ options, setOptions ] = useState<AuthState>({
        isAuth: false,
        token: ''
    });

    useEffect(() => {
        let savedAuth = getAuthData();

        if (savedAuth.token) setAuthState(savedAuth.token);
    }, []);
    useEffect(() => {
        if (userAuth) {
            saveUserAuth(userAuth);
            setAuthState(userAuth.token);
        }
    }, [userAuth]);

    const saveUserAuth = (userAuth: UserAuth) => {
        setAuthData(userAuth);
    }
    const updateUserAuth = (userAuth: UserAuth) => {
        delAuthData();
        setAuthData(userAuth);
    }
    const deleteAuth = () => {
        delAuthData();
        setAuthState('');
    }
    const setAuthState = (newToken: string) => {
        setOptions({
            isAuth: newToken !== '' ? true : false,
            token: newToken
        });
    }

    return {
        updateAuth: (update?: UserAuth) => {
            if (update) {
                updateUserAuth(update);
            }
        },
        finishSession: deleteAuth,
        isAuth: options.isAuth,
        token: options.token
    }
}

export default useAuth;