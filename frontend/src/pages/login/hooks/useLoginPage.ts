import { useEffect } from 'react';
import { QueryStatus } from '@tanstack/react-query';
import { UserAuth } from '../../../types';
import { useNavigate } from 'react-router-dom';

type UseLoginPage = {
    isLogged: boolean;
    loginUser: (userAuth: UserAuth) => void;
    loginStatus: QueryStatus;
    userAuthentication: UserAuth | undefined;
}

const useLoginPage = ({ isLogged, loginUser, loginStatus, userAuthentication }: UseLoginPage) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogged) {
            navigateHome();
        }
    }, []);

    useEffect(() => {
        if (userAuthentication && loginStatus === 'success') {
            loginUser(userAuthentication);
            navigateHome();
        }
    }, [loginStatus]);

    const navigateHome = () => navigate('/');
}

export default useLoginPage;