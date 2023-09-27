import { ChangeEvent, FormEvent } from 'react';
import { LoginProps } from '../types';
import { Button, FormControl, FormHelperText, FormLabel, Heading, Input } from '@chakra-ui/react';


function LogIn({ refetch, error, isError, validCredentials, setCredentials }: LoginProps) {
  const handleInputsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials(e.target.name, e.target.value);
  }
  
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validCredentials) {
      refetch();
    } else {
      // show invalid credentials
    }
  }
  
  const handleQueryError = () => {
    let errorRes = error?.response;

    if (errorRes?.status === 400) {
      let dataError = errorRes?.data.error;

      if (dataError === 'User does not exists') {
        dataError = dataError.replace('User', 'Email');
      }
      return <p>{dataError}!</p>;
    }
    return <p>Something went wrong. Please, try again later!</p>;
  }
  
  return (
    <main>
      <section id="login-section" className="flex-center-col login-section">
        <Heading as="h4" size="md" mb="3">Login</Heading>

        <form id="login-form" onSubmit={handleFormSubmit} className="flex-center-col">
          <FormControl m="1">
            <FormLabel>Email address</FormLabel>
            <Input id="email" name="email" type="email" placeholder="my-mail@books.app" onChange={handleInputsChange} required />
            <FormHelperText mt="0.5">We'll never share your email.</FormHelperText>
          </FormControl>

          <FormControl m="1">
            <FormLabel>Password</FormLabel>
            <Input  id="password" name="password" type="password" onChange={handleInputsChange} required />
            <FormHelperText mt="0.5">show this if password is wrong or invalid</FormHelperText>
          </FormControl>

          <Button id="login-submit" type="submit" m="2">Login</Button>
        </form>
        {
          isError && handleQueryError()
        }
      </section>
    </main>
  );
}

export default LogIn;