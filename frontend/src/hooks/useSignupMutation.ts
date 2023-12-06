import { useMutation } from '@tanstack/react-query';
import { register } from '../api/api';
import { ServerErrorMessage, SignupUserData, UserAuth } from '../types';
import { AxiosError } from 'axios';


const useSignupMutation = () => {
    const { data, mutate, isError, error, isLoading } = useMutation<UserAuth, AxiosError<ServerErrorMessage>, SignupUserData>({
        mutationFn: register
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