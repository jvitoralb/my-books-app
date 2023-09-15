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
  
    return {
      credentials: loginCredentials,
      setCredentials: setCredentials
    }
}

export default useLoginCredentials;