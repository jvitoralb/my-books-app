import { ChangeEvent, FormEvent, useState } from 'react';
import { FieldsArray, LoginProps } from '../types';
import { Button, FormControl, FormHelperText, FormLabel, Heading, Input } from '@chakra-ui/react';


function LogIn({ refetch, error, isError, setCredentials, isValid, fields }: LoginProps) {
  const [ warnings, setWarnings ] = useState({
    display: false,
    email: '',
    password: ''
  });

  const handleWarnings = (warnFields: FieldsArray | null) => {
    let emailMsg = '';
    let passwordMsg = '';

    if (warnFields === null) {
      setWarnings({
        display: false,
        email: emailMsg,
        password: passwordMsg
      });
      return;
    }

    if (warnFields[0] !== null) {
      if (isValid === false) emailMsg = 'Invalid email!';
      if (isError === true) emailMsg = 'Email does not exists';
    }
    if (warnFields[1] !== null) {
      if (isValid === false) passwordMsg = 'Invalid password';
      if (isError === true) passwordMsg = 'Wrong password';
    }

    setWarnings({
      display: true,
      email: emailMsg,
      password: passwordMsg
    });
  }

  const handleInputsChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (warnings.display) handleWarnings(null);
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

      if (warnings.display === false) {
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
          <FormControl m="1" isInvalid={warnings.display && warnings.email !== ''}>
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input id="email" name="email" type="email" placeholder="my-mail@books.app" onChange={handleInputsChange} required />
            {
              warnings.display && warnings.email ? 
              <FormHelperText mt="0.5">{warnings.email}</FormHelperText> : 
              <FormHelperText mt="0.5">We'll never share your email.</FormHelperText>
            }
          </FormControl>

          <FormControl m="1" isInvalid={warnings.display && warnings.password !== ''}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input id="password" name="password" type="password" onChange={handleInputsChange} required />
            {
              warnings.display && warnings.password ? 
              <FormHelperText mt="0.5">{warnings.password}</FormHelperText> :
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