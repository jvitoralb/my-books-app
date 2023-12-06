import { redirect } from 'react-router-dom';
import handleAuth from '../../utils/auth';


const authLoader = () => {
    const { isAuth } = handleAuth();

    if (isAuth) {
        return redirect('/');
    }

    return null;
}

export default authLoader;