import { Button } from '@chakra-ui/react';
import { FormEvent } from 'react';
import { InputControlProps, LoginFormProps } from '../../types';
import InputControl from './InputControl';


function LoginForm({ refetch, setCredentials, isValid, displayWarning, emailWarning, passwordWarning, handleWarnings, fields }: LoginFormProps) {
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isValid) {
      refetch();
    } else {
      handleWarnings(fields);
    }
  }

  const inputControlProps: InputControlProps = {
    subject: 'email' || 'password',
    setCredentials,
    displayWarning,
    handleWarnings,
    emailWarning,
    passwordWarning,
  }

  return (
    <form id="login-form" onSubmit={handleFormSubmit} className="flex-center-col">
      <InputControl
        {...inputControlProps}
        subject="email"
      />
      <InputControl
        { ...inputControlProps }
        subject="password"
      />

      <Button id="login-submit" type="submit" m="2">Login</Button>
    </form>
  );
}

export default LoginForm;