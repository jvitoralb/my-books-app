import { AxiosError } from 'axios';
import { getUser } from '../../api/api';
import { redirect } from 'react-router-dom';
import { delAuthData, getAuthData } from '../../utils/auth';


const homeLoader = async () => {
    const authData = getAuthData();

    if (!authData.token) {
        return redirect('/welcome');
    }

    try {
        return await getUser(authData.token);
    } catch (err) {
        if (err instanceof AxiosError) {
            if (err.response?.status === 401 || err.response?.status === 403) {
                delAuthData();
                return redirect('/login');
            }
        }
        // 'Something went wrong, please try again later!' ->
        // carregar uma pagina de crash, sinalizando o error
        console.error(err)
    }
}

export default homeLoader;