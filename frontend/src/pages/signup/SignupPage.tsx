import SignUp from '../../components/Signup';
import useAuth from '../../hooks/useAuth';
import useSignupPage from './hooks/useSignupPage';
import useSignupData from './hooks/useSignupData';
import useSignupMutation from './hooks/useSignupMutation';


function SignUpPage() {
  const { isUserLogged } = useAuth();

  const {
    signupData,
    setSignupData,
    isValid,
    fields
  } = useSignupData();

  const {
    mutate,
    isLoading,
    isError,
    error,
    status,
  } = useSignupMutation();

  useSignupPage({
    isLogged: isUserLogged,
    signupStatus: status,
  });

  return (
    <SignUp
      mutate={mutate}
      isLoading={isLoading}
      isError={isError}
      error={error}
      setSignupData={setSignupData}
      signupData={signupData}
      isValid={isValid}
      fields={fields}
    />
  );
}

export default SignUpPage;