import { Navigate } from 'react-router-dom';
import useSignupData from '../../hooks/useSignupData';
import useSignupMutation from '../../hooks/useSignupMutation';
import useAuth from '../../hooks/useAuth';
import { SignupProps } from '../../types';
import SignUp from '../../components/Signup';


function SignUpPage() {
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
    error
  } = useSignupMutation();

  const { isAuth } = useAuth(data);

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

  return (isAuth ? <Navigate to="/" /> : <SignUp { ...signupProps } />);
}

export default SignUpPage;