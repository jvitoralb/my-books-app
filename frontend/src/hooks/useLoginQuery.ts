import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { logUser } from '../api/api';
import { LoginCredentials } from '../types';

type ServerErrorMessage = {
  error: string
}

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
    }
  });

  return {
    data,
    isError,
    error,
    refetch
  }
}

export default useLoginQuery;