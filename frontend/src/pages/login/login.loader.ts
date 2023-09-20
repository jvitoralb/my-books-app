import {redirect } from 'react-router-dom';
import { getAuthData } from '../../utils/auth';


const loginLoader = () => {
    const authData = getAuthData();
  
    if (authData.token) {
        return redirect('/');
    }
  
    return null;
}

export default loginLoader;