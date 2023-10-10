import { useMutation } from '@tanstack/react-query';
import { createUser } from '../api/api';
import { ServerErrorMessage, SignupUserData, UserAuth } from '../types';
import { AxiosError } from 'axios';


const useSignupMutation = () => {
    const { data, mutate, isError, error, isLoading } = useMutation<UserAuth, AxiosError<ServerErrorMessage>, SignupUserData>({
        mutationFn: createUser
    });

    return {
        data,
        mutate,
        isLoading,
        isError,
        error
    }
}

export default useSignupMutation;