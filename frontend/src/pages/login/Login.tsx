import { ChangeEvent, FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import useLoginCredentials from '../../hooks/useLoginCredentials';
import useLoginQuery from '../../hooks/useLoginQuery';
import useAuth from '../../hooks/useAuth';


function LogInPage() {
  const {
    credentials,
    setCredentials,
    validCredentials
  } = useLoginCredentials();

  const {
    data,
    isError,
    error,
    refetch
  } = useLoginQuery(credentials);

  const { isAuth } = useAuth({
    data: data,
    operation: 'SET'
  });

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
    isAuth ? 
    <Navigate to="/" /> : 
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

export default LogInPage;