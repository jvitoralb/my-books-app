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
    validCredentials
  } = useLoginCredentials();

  const {
    data,
    isError,
    error,
    refetch
  } = useLoginQuery(credentials);

  const { isAuth } = useAuth({
    data: data,
    operation: 'SET'
  });

  const LoginProps: LoginProps = {
    refetch,
    isError,
    error,
    setCredentials,
    validCredentials
  }

  return (isAuth ? <Navigate to="/" /> : <LogIn {...LoginProps} />);
}

export default LogInPage;