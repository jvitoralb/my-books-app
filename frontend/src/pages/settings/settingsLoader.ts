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
            if (statusCode === 400 || statusCode === 401 || statusCode === 403) {
                finishSession();
                return redirect('/login');
            }
        }
        // 'Something went wrong, please try again later!' ->
        // carregar uma pagina de crash, sinalizando o error
        console.error(err);
    }
}

export default settingsLoader;