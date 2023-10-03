import { ChangeEvent, FormEvent } from 'react';
import { FieldsArray, LoginProps } from '../types';
import { Button, FormControl, FormHelperText, FormLabel, Heading, Input } from '@chakra-ui/react';
import useWarnings from '../hooks/useWarning';


function LogIn({ refetch, error, isError, setCredentials, isValid, fields }: LoginProps) {
  const {
    handleWarnings,
    displayWarning,
    emailWarning,
    passwordWarning
  } = useWarnings(isValid, isError);

  const handleInputsChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (displayWarning) handleWarnings(null);
    setCredentials(e.target.name, e.target.value);
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isValid) {
      refetch();
    } else {
      handleWarnings(fields);
    }
  }
  
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

  return (
    <main>
      <section id="login-section" className="flex-center-col login-section">
        <Heading as="h4" size="md" mb="3">Login</Heading>

        <form id="login-form" onSubmit={handleFormSubmit} className="flex-center-col">
          <FormControl m="1" isInvalid={displayWarning && emailWarning !== ''}>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input id="email" name="email" type="email" placeholder="my-mail@books.app" onChange={handleInputsChange} required />
            {
              displayWarning && emailWarning ? 
              <FormHelperText mt="0.5">{emailWarning}</FormHelperText> : 
              <FormHelperText mt="0.5">We'll never share your email.</FormHelperText>
            }
          </FormControl>

          <FormControl m="1" isInvalid={displayWarning && passwordWarning !== ''}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input id="password" name="password" type="password" onChange={handleInputsChange} required />
            {
              displayWarning && passwordWarning ? 
              <FormHelperText mt="0.5">{passwordWarning}</FormHelperText> :
              <FormHelperText mt="0.5">We'll never ask for your password.</FormHelperText>
            }
          </FormControl>

          <Button id="login-submit" type="submit" m="2">Login</Button>
        </form>
        { isError && handleQueryError() }
      </section>
    </main>
  );
}

export default LogIn;