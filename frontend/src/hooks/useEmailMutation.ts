import { useMutation } from '@tanstack/react-query';
import { updateUserEmail } from '../api/users';
import { CustomAxiosError, UserAuth, EmailUpdates } from '../types';


const useEmailMutation = (authToken: string) => {
    const {
        data,
        mutate,
        status,
        error
    } = useMutation<UserAuth, CustomAxiosError, EmailUpdates>({
        mutationFn: updateUserEmail
    });

    const sendUpdates = (updates: EmailUpdates) => {
        mutate(updates);
    }

    return {
        emailMutationRes: data,
        emailSendUpdates: sendUpdates,
        emailStatus: status,
        emailError: error
    }
}

export default useEmailMutation;