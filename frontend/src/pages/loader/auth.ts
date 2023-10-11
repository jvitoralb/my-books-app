import { redirect } from 'react-router-dom';
import { getAuthData } from '../../utils/auth';


const authLoader = () => {
    const authData = getAuthData();

    if (authData.token) {
        return redirect('/');
    }

    return null;
}

export default authLoader;