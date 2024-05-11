import LogIn from '../../components/Login';
import useLoginPage from './hooks/useLoginPage';
import useAuth from '../../hooks/useAuth';
import useLoginCredentials from './hooks/useLoginCredentials';
import useLoginQuery from './hooks/useLoginQuery';


function LogInPage() {
  const { isUserLogged } = useAuth();

  const {
    credentials,
    setCredentials,
    isValid,
    fields
  } = useLoginCredentials();

  const {
    isError,
    error,
    refetch,
    isLoadingRefetch,
    status
  } = useLoginQuery(credentials);

  useLoginPage({
    isLogged: isUserLogged,
    loginStatus: status,
  });

  return (
    <LogIn
      refetch={refetch}
      isError={isError}
      error={error}
      setCredentials={setCredentials}
      isValid={isValid}
      fields={fields}
      isLoadingRefetch={isLoadingRefetch}
    />
  );
}

export default LogInPage;