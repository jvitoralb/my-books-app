import { useMutation } from '@tanstack/react-query';
import { updateUserPassword } from '../../../api/users';
import { CustomAxiosError, PasswordUpdates } from '../../../types';
import { AxiosResponse } from 'axios';
import { useEffect } from 'react';


const usePasswordMutation = (authToken: string) => {
    const {
        status,
        mutate,
        error,
        reset,
    } = useMutation<AxiosResponse, CustomAxiosError, PasswordUpdates>({
        mutationFn: updateUserPassword
    });

    useEffect(() => {
        if (status === 'idle') return;

        const timer = setTimeout(() => reset(), 5000);

        return () => clearTimeout(timer);
    }, [status]);

    const sendUpdates = (updates: PasswordUpdates) => {
        mutate(updates);
    }

    return {
        pswdSendUpdates: sendUpdates,
        pswdStatus: status,
        pswdError: error
    }
}

export default usePasswordMutation;