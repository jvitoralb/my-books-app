import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useLoginCredentials from './hooks/useLoginCredentials';
import useLoginQuery from './hooks/useLoginQuery';
import LogIn from '../../components/Login';
import { LoginProps } from '../../types';


function LogInPage() {
  const {
    credentials,
    setCredentials,
    isValid,
    fields
  } = useLoginCredentials();

  const {
    data,
    isError,
    error,
    refetch,
    isLoadingRefetch
  } = useLoginQuery(credentials);

  const { isAuth } = useAuth(data);

  const loginProps: LoginProps = {
    refetch,
    isError,
    error,
    setCredentials,
    isValid,
    fields,
    isLoadingRefetch
  }

  return (isAuth ? <Navigate to="/" /> : <LogIn {...loginProps} />);
}

export default LogInPage;