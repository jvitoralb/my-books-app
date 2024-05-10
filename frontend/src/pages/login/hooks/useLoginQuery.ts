import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { login } from '../../../api/auth';
import { LoginCredentials, ServerErrorMessage } from '../../../types';


function useLoginQuery(credentials: LoginCredentials) {
    const { data, isError, error, refetch, fetchStatus, status } = useQuery({
        queryKey: ['token', credentials],
        queryFn: () => login(credentials),
        enabled: false,
        retry: (failureCount: number, error: AxiosError<ServerErrorMessage>) => {
            if (error || failureCount > 2) {
                return false;
            }
            return true;
        },
        cacheTime: 0
    });

    const isLoadingRefetch = fetchStatus === 'fetching' ? true : false;

    return {
        data,
        isError,
        error,
        refetch,
        isLoadingRefetch,
        status,
    }
}

export default useLoginQuery;