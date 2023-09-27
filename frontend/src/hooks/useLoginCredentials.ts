import { useState } from 'react';
import { LoginCredentials } from '../types';


const useLoginCredentials = () => {
  const [ loginCredentials, setloginCredentials ] = useState<LoginCredentials>({
    email: '',//yo.admin.jv@library.app
    password: ''//yo.admin.jv-strongpswd123
  });

  const setCredentials = (inputName: string, inputValue: string) => {
    setloginCredentials((prevCred) => ({
      ...prevCred,
      [inputName]: inputValue
    }));
  }

  const validateCredentials = (): boolean => {
    if (loginCredentials.email.match(/^\S+[@]\S+[.]\S+$/) === null) {
      return false;
    }
    if (loginCredentials.password.length < 8) {
      return false;
    }
    return true;
  }

  return {
    credentials: loginCredentials,
    setCredentials: setCredentials,
    validCredentials: validateCredentials()
  }
}

export default useLoginCredentials;