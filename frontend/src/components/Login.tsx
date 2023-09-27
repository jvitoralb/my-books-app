import { ChangeEvent, FormEvent } from 'react';
import { LoginProps } from '../types';


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
  
  const handleError = () => { // change to handleQueryError
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
    <>
      <h1>LogIn</h1>

      <form onSubmit={handleFormSubmit}>
        <label>
          Email
          <input id="email" name="email" type="email" onChange={handleInputsChange} required />
        </label>

        <label>
          Password
          <input id="password" name="password" type="password" onChange={handleInputsChange} required />
        </label>

        <button id="login-submit">Login</button>
      </form>
      {
        isError && handleError()
      }
    </>
  );
}

export default LogIn;