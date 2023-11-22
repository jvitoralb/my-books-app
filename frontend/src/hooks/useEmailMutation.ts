import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { updateUserEmail } from '../api/api';
import { CustomAxiosError, UserAuth, EmailUpdates } from '../types';
import { delAuthData, setAuthData } from '../utils/auth';


const useEmailMutation = (authToken: string) => {
    const {
        data,
        mutate,
        isError,
        error,
        isLoading,
        isSuccess
    } = useMutation<UserAuth, CustomAxiosError, { updates: EmailUpdates, authorization: string }>({
        mutationFn: updateUserEmail
    });

    useEffect(() => {
        if (!isError && data !== undefined) {
            delAuthData();
            setAuthData(data);
        }
    }, [data]);

    const sendUpdates = (updates: EmailUpdates) => {
        mutate({
            updates,
            authorization: authToken
        });
    }

    return {
        emailMutationRes: data,
        emailSendUpdates: sendUpdates,
        emailIsLoading: isLoading,
        emailIsSuccess: isSuccess,
        emailIsError: isError,
        emailError: error
    }
}

export default useEmailMutation;