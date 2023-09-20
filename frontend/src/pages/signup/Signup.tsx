import { FormEvent, ChangeEvent } from 'react';
import useSignupData from '../hooks/useSignupData';
import useSignupMutation from '../hooks/useSignupMutation';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';


function SignUp() {
  const {
    signupData,
    setSignupData,
  } = useSignupData();

  const {
    data,
    mutate
  } = useSignupMutation();

  const { isAuth } = useAuth({
    data: data,
    operation: 'SET'
  });

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    mutate(signupData);
  }

  const handleInputsChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSignupData(e.target.name, e.target.value);
  }

  return (
    isAuth ? 
    <Navigate to="/" /> : 
    <>
      <h1>SignUp</h1>

      <form onSubmit={handleFormSubmit}>
        <label>
          Name
          <input id="name" name="name" type="name" onChange={handleInputsChange} />
        </label>
        <label>
          Email
          <input id="email" name="email" type="email" onChange={handleInputsChange} />
        </label>
        <label>
          Password
          <input id="password" name="password" type="password" onChange={handleInputsChange} />
        </label>
        <label>
          Confirm Password
          <input id="confirm_password" name="confirm_password" type="password" onChange={handleInputsChange} />
        </label>

        <button id="login-submit">Submit</button>
      </form>
    </>
  );
}

export default SignUp;