import handleAuth from '../utils/auth';
import { UserAuth } from '../types';

const useAuth = () => {
    const handler = handleAuth();

    const loginUser = (userAuth: UserAuth) => {
        handler.startSession(userAuth);
    }
    const logoutUser = () => {
        handler.finishSession();
    }
    const updateUserAuth = (userAuth: UserAuth) => {
        handler.finishSession();
        handler.startSession(userAuth);
    }

    return {
        loginUser: loginUser,
        logoutUser: logoutUser,
        isUserLogged: handler.isAuth(),
        token: handler.getToken(),
        updateAuth: (update?: UserAuth) => {
            if (update) {
                updateUserAuth(update);
            }
        },
    }
}

export default useAuth;