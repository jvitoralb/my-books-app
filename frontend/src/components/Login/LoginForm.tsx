import { Button } from '@chakra-ui/react';
import { FormEvent } from 'react';
import { LoginFormProps } from '../../types';
import InputControl from './InputControl';
import useWarnings from '../../hooks/useWarning';


function LoginForm({ refetch, isError, setCredentials, isValid, fields }: LoginFormProps) {
  const {
    handleWarnings,
    displayWarning,
    emailWarning,
    passwordWarning
  } = useWarnings(isValid, isError);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isValid) {
      refetch();
    } else {
      handleWarnings(fields);
    }
  }

  return (
    <form id="login-form" onSubmit={handleFormSubmit} className="flex-center-col">
      <InputControl
        subject="email"
        setCredentials={setCredentials}
        displayWarning={displayWarning}
        handleWarnings={handleWarnings}
        subjectWarning={emailWarning}
      />

      <InputControl
        subject="password"
        setCredentials={setCredentials}
        displayWarning={displayWarning}
        handleWarnings={handleWarnings}
        subjectWarning={passwordWarning}
      />

      <Button id="login-submit" type="submit" m="2">Login</Button>
    </form>
  );
}

export default LoginForm;