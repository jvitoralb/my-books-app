import { SignupProps } from '../../types';
import { Heading } from '@chakra-ui/react';
import SignupForm from './SignupForm';
import useErrorHandler from '../../hooks/useErrorHandler';
import './styles/signup.css';


function SignUp({ mutate, isLoading, isError, error, setSignupData, signupData, isValid, fields }: SignupProps) {
  const {
    errorFields,
    warnElement
  } = useErrorHandler(isError, error);

  return (
    <main>
      <section id="signup-section" className="signup-section">
        <Heading as="h4" size="md" mb="2" fontWeight="semibold">SignUp</Heading>

        <SignupForm
          mutate={mutate}
          isLoading={isLoading}
          isError={isError}
          errorFields={errorFields}
          setSignupData={setSignupData}
          signupData={signupData}
          isValid={isValid}
          fields={fields}
        />

        {warnElement}
      </section>
    </main>
  );
}

export default SignUp;