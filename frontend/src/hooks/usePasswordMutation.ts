import { useMutation } from '@tanstack/react-query';
import { updateUserPassword } from '../api/api';
import { CustomAxiosError, PasswordUpdates } from '../types';
import { AxiosResponse } from 'axios';


const usePasswordMutation = (authToken: string) => {
    const {
        status,
        mutate,
        error
    } = useMutation<AxiosResponse, CustomAxiosError, { updates: PasswordUpdates; authorization: string; }>({
        mutationFn: updateUserPassword
    });

    const sendUpdates = (updates: PasswordUpdates) => {
        mutate({
            updates,
            authorization: authToken
        });
    }

    return {
        pswdSendUpdates: sendUpdates,
        pswdStatus: status,
        pswdError: error
    }
}

export default usePasswordMutation;