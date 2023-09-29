import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { logUser } from '../api/api';
import { LoginCredentials, ServerErrorMessage } from '../types';


function useLoginQuery(credentials: LoginCredentials) {
    const { data, isError, error, refetch } = useQuery({
        queryKey: ['token', credentials],
        queryFn: logUser,
        enabled: false,
        retry: (failureCount: number, error: AxiosError<ServerErrorMessage>) => {
            if (error || failureCount > 2) {
                return false;
            }
            return true;
        },
        cacheTime: 0
    });

    return {
        data,
        isError,
        error,
        refetch
    }
}

export default useLoginQuery;