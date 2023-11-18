import { useMutation } from '@tanstack/react-query';
import { updateUserEmail } from '../api/api';
import { CustomAxiosError, UserAuth, EmailUpdates } from '../types';
import { useEffect } from 'react';
import { delAuthData, setAuthData } from '../utils/auth';


const useEmailMutation = () => {
    const {
        data,
        mutate,
        isError,
        error,
        isLoading,
    } = useMutation<UserAuth, CustomAxiosError, { updates: EmailUpdates, authorization: string }>({
        mutationFn: updateUserEmail
    });

    useEffect(() => {
        if (!isError && data !== undefined) {
            delAuthData();
            setAuthData(data);
        }
    }, [data]);

    return {
        emailMutationRes: data,
        emailMutate: mutate,
        emailIsLoading: isLoading,
        emailIsError: isError,
        emailError: error
    }
}

export default useEmailMutation;