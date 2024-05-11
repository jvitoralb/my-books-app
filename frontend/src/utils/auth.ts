import { redirect } from 'react-router-dom';


const getAccessToken = (): string => {
    const accessToken = document.cookie.split(';').find(c => c.includes('access_token'));

    if (accessToken) {
        const [ _, token ] = accessToken.split('=');
        return token;
    }
    return '';
}

const delAccessToken = (): void => {
    document.cookie = 'access_token=' + '; expires=Thu, 01 Jan 1970 00:00:01 GMT';
}

const handleAuth = () => {
    const startSession = () => {}
    const finishSession = () => {
        delAccessToken();
    }
    const isAuth = () => {
        if (getAccessToken()) {
            return true;
        }
        return false;
    }
    const getToken = () => {
        return getAccessToken();
    }
    const requireAuth = (customPath?: string) => {
        const token = getAccessToken();

        if (!token) {
            let path = customPath ? customPath : '/login';
            throw redirect(path);
        }
    }

    return {
        isAuth: isAuth,
        getToken: getToken,
        startSession: startSession,
        finishSession: finishSession,
        requireAuth: requireAuth,
    }
}

export default handleAuth;
