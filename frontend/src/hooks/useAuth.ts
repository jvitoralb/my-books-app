import { useState } from 'react';
import { UserAuth } from '../types';
import { getAuthToken, setAuthToken } from '../utils/auth';

type AuthHookOptions = {
    data?: UserAuth;
    operation: 'SET' | 'GET';
    setter?: Function;
    getter?: Function;
}

type AuthState = {
    isAuth: boolean;
    token: string;
}

const useAuth = ({ data, operation, setter, getter }: AuthHookOptions): AuthState => {
    if (!setter) setter = setAuthToken;
    if (!getter) getter = getAuthToken;

    const [ auth, setAuth ] = useState<AuthState>({
        isAuth: false,
        token: ''
    });

    if (operation === 'SET' && !auth.isAuth && data?.token) {
        setter(data.token);

        setAuth((prevAuth) => ({
            ...prevAuth,
            isAuth: true
        }));
    }
    // else if (operation === 'GET' && auth.token === '') {
    //     let authToken = getter();

    //     setAuth((prevAuth) => ({
    //         ...prevAuth,
    //         token: authToken
    //     }));
    // }

    return {
        isAuth: auth.isAuth,
        token: auth.token
    };
}

export default useAuth;