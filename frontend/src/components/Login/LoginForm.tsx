import { Button } from '@chakra-ui/react';
import { FormEvent, useEffect } from 'react';
import { LoginFormProps } from '../../types';
import InputControl from '../InputControl';
import useWarnings from '../../hooks/useWarnings';


function LoginForm({ refetch, isError, errorFields, setCredentials, isValid, fields }: LoginFormProps) {
  const {
    handleWarnings,
    displayWarning,
    emailWarning,
    passwordWarning
  } = useWarnings(isValid, isError);

  useEffect(() => {
    if (isError) handleWarnings(errorFields);
  }, [errorFields]);

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
        setFormState={setCredentials}
        displayWarning={displayWarning}
        handleWarnings={handleWarnings}
        subjectWarning={emailWarning}
      />

      <InputControl
        subject="password"
        setFormState={setCredentials}
        displayWarning={displayWarning}
        handleWarnings={handleWarnings}
        subjectWarning={passwordWarning}
      />

      <Button id="login-submit" type="submit" m="2">Login</Button>
    </form>
  );
}

export default LoginForm;