import LogIn from '../../components/Login';
import useLoginPage from './hooks/useLoginPage';
import useAuth from '../../hooks/useAuth';
import useLoginCredentials from './hooks/useLoginCredentials';
import useLoginQuery from './hooks/useLoginQuery';
import { LoginProps } from '../../types';


function LogInPage() {
  const { isUserLogged, loginUser } = useAuth();

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
    isLoadingRefetch,
    status
  } = useLoginQuery(credentials);

  useLoginPage({
    isLogged: isUserLogged,
    loginStatus: status,
    loginUser: loginUser,
    userAuthentication: data,
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

  return (<LogIn {...loginProps} />);
}

export default LogInPage;