import { Heading } from '@chakra-ui/react';
import { FieldsArray, LoginProps, LoginFormProps } from '../../types';
import LoginForm from './LoginForm';
import useWarnings from '../../hooks/useWarning';


function LogIn({ refetch, error, isError, setCredentials, isValid, fields }: LoginProps) {
  const {
    handleWarnings,
    displayWarning,
    emailWarning,
    passwordWarning
  } = useWarnings(isValid, isError);

  const handleQueryError = () => {
    let errorRes = error?.response;

    if (errorRes?.status === 400) {
      let dataError = errorRes?.data.error;
      let queryWarnFields: FieldsArray = [ null, null ];

      if (dataError === 'User does not exists') queryWarnFields[0] = 'email';
      if (dataError === 'Invalid password') queryWarnFields[1] = 'password';

      if (displayWarning === false) {
        handleWarnings(queryWarnFields);
      }
      return undefined;
    }
    return <p className="error-message">Something went wrong. Please, try again later!</p>;
  }

  const LoginFormProps: LoginFormProps = {
    refetch,
    setCredentials,
    isValid,
    displayWarning,
    emailWarning,
    passwordWarning,
    handleWarnings,
    fields,
  }

  return (
    <main>
      <section id="login-section" className="flex-center-col login-section">
        <Heading as="h4" size="md" mb="3">Login</Heading>

        <LoginForm {...LoginFormProps} />

        { isError && handleQueryError() }
      </section>
    </main>
  );
}

export default LogIn;