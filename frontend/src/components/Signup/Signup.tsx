import { SignupProps } from '../../types';
import { Heading } from '@chakra-ui/react';
import SignupForm from './SignupForm';
import useErrorHandler from '../../hooks/useErrorHandler';


function SignUp({ mutate, isError, error, setSignupData, signupData, isValid, fields }: SignupProps) {
  const {
    errorFields,
    warnElement
  } = useErrorHandler(isError, error);

  return (
    <main>
      <section id="signup-section" className="flex-center-col signup-section">
        <Heading as="h4" size="md" mb="3">SignUp</Heading>

        <SignupForm
          mutate={mutate}
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