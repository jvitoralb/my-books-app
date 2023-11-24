import { useMutation } from '@tanstack/react-query';
import { updateUserEmail } from '../api/api';
import { CustomAxiosError, UserAuth, EmailUpdates } from '../types';


const useEmailMutation = (authToken: string) => {
    const {
        data,
        mutate,
        status,
        error
    } = useMutation<UserAuth, CustomAxiosError, { updates: EmailUpdates, authorization: string }>({
        mutationFn: updateUserEmail
    });

    const sendUpdates = (updates: EmailUpdates) => {
        mutate({
            updates,
            authorization: authToken
        });
    }

    return {
        emailMutationRes: data,
        emailSendUpdates: sendUpdates,
        emailStatus: status,
        emailError: error
    }
}

export default useEmailMutation;