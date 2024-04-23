import SignUp from '../../components/Signup';
import useAuth from '../../hooks/useAuth';
import useSignupPage from './hooks/useSignupPage';
import useSignupData from './hooks/useSignupData';
import useSignupMutation from './hooks/useSignupMutation';
import { SignupProps } from '../../types';


function SignUpPage() {
  const { isUserLogged, loginUser } = useAuth();

  const {
    signupData,
    setSignupData,
    isValid,
    fields
  } = useSignupData();

  const {
    data,
    mutate,
    isLoading,
    isError,
    error,
    status,
  } = useSignupMutation();

  useSignupPage({
    isLogged: isUserLogged,
    loginUser: loginUser,
    signupStatus: status,
    userAuthentication: data,
  });

  const signupProps: SignupProps = {
    mutate,
    isLoading,
    isError,
    error,
    setSignupData,
    signupData,
    isValid,
    fields
  }

  return (<SignUp { ...signupProps } />);
}

export default SignUpPage;