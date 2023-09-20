import { useState } from 'react';
import { UserAuth } from '../types';
import { getAuthToken, setAuthToken } from '../utils/auth';

type AuthHookOptions = {
    data?: UserAuth;
    operation: 'SET' | 'GET';
}

type AuthState = {
    isAuth: boolean;
    token: string;
}

const useAuth = ({ data, operation }: AuthHookOptions): AuthState => {
    const [ auth, setAuth ] = useState<AuthState>({
        isAuth: false,
        token: ''
    });

    if (operation === 'SET') {
        if (!auth.isAuth && data) {
            setAuthToken(data);
        
            setAuth((prev) => ({
                ...prev,
                isAuth: true
            }));
        }
    } else if (operation === 'GET') {
        let authData = getAuthToken();
        
        if (auth.token === '' && authData.token !== '') {
            setAuth((prevAuth) => ({
                ...prevAuth,
                token: authData.token
            }));
        }
    }

    return {
        isAuth: auth.isAuth,
        token: auth.token
    };
}

export default useAuth;