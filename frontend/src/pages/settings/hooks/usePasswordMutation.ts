import { useMutation } from '@tanstack/react-query';
import { updateUserPassword } from '../api/users';
import { CustomAxiosError, PasswordUpdates } from '../types';
import { AxiosResponse } from 'axios';


const usePasswordMutation = (authToken: string) => {
    const {
        status,
        mutate,
        error
    } = useMutation<AxiosResponse, CustomAxiosError, PasswordUpdates>({
        mutationFn: updateUserPassword
    });

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