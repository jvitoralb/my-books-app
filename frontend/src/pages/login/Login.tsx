import { Navigate } from 'react-router-dom';
import { LoginProps } from '../../types';
import useLoginCredentials from '../../hooks/useLoginCredentials';
import useLoginQuery from '../../hooks/useLoginQuery';
import useAuth from '../../hooks/useAuth';
import LogIn from '../../components/Login';


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

  const { isAuth } = useAuth({
    data: data,
    operation: 'SET'
  });

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