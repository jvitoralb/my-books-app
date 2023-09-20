import { ChangeEvent, FormEvent } from 'react';
import { Navigate, redirect } from 'react-router-dom';
import useLoginCredentials from '../hooks/useLoginCredentials';
import useLoginQuery from '../hooks/useLoginQuery';
import useAuth from '../hooks/useAuth';
import { getAuthToken } from '../utils/auth';


export const loginLoader = () => { // tenho que tirar isso daqui
  const authData = getAuthToken();

  if (authData.token) {
    return redirect('/');
  }

  return null;
}

function LogIn() {
  const { credentials, setCredentials } = useLoginCredentials();

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
    // preciso criar o logIn request ErrorHandler
    // validar se os dados podem ser enviados para o server
    refetch();
  }

  return (
    isAuth ? 
    <Navigate to="/" /> : 
    <>
      <h1>LogIn</h1>

      <form onSubmit={handleFormSubmit}>
        <label>
          Email
          <input id="email" name="email" type="email" onChange={handleInputsChange} />
        </label>

        <label>
          Password
          <input id="password" name="password" type="password" onChange={handleInputsChange} />
        </label>

        <button id="login-submit">Submit</button>
      </form>
    </>
  );
}

export default LogIn;