import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MutationStatus } from '@tanstack/react-query';
import { UserAuth } from '../../../types';

type UseSignupPage = {
    isLogged: boolean;
    loginUser: (userAuth: UserAuth) => void;
    signupStatus: MutationStatus;
    userAuthentication: UserAuth | undefined;
}

const useSignupPage = ({ isLogged, loginUser, signupStatus, userAuthentication }: UseSignupPage) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogged) {
            navigateHome();
        }
    }, []);

    useEffect(() => {
        if (userAuthentication && signupStatus === 'success') {
            loginUser(userAuthentication);
            navigateHome();
        }
    }, [signupStatus]);

    const navigateHome = () => navigate('/');
}

export default useSignupPage;