import { AxiosError } from 'axios';
import { redirect } from 'react-router-dom';
import { getUserInfo } from '../../api/users';
import handleAuth from '../../utils/auth';


const settingsLoader = async () => {
    const { isAuth, finishSession } = handleAuth();

    if (!isAuth) {
        return redirect('/welcome');
    }

    try {
        return await getUserInfo();
    } catch (err) {
        if (err instanceof AxiosError) {
            let statusCode = err.response?.status;
            if (statusCode === 401 || statusCode === 403) {
                finishSession();
                return redirect('/login');
            } else if (statusCode === 400) {
                throw new Response('This is a Bad Request.', { status: 400 });
            }
        }
        throw new Response('Something went wrong', { status: 500 });
    }
}

export default settingsLoader;