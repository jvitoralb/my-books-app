import { useMutation } from '@tanstack/react-query';
import { updateUserEmail } from '../../../api/users';
import { CustomAxiosError, UserAuth, EmailUpdates } from '../../../types';
import { useEffect } from 'react';


const useEmailMutation = () => {
    const {
        data,
        mutate,
        status,
        error,
        reset
    } = useMutation<UserAuth, CustomAxiosError, EmailUpdates>({
        mutationFn: updateUserEmail
    });

    useEffect(() => {
        if (status === 'idle') return;

        const timer = setTimeout(() => reset(), 5000);

        return () => clearTimeout(timer);
    }, [status]);

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