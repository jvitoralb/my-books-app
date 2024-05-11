import handleAuth from '../utils/auth';

const useAuth = () => {
    const handler = handleAuth();

    const loginUser = () => {}
    const logoutUser = () => {
        handler.finishSession();
    }
    const updateUserAuth = () => {}

    return {
        loginUser: loginUser,
        logoutUser: logoutUser,
        isUserLogged: handler.isAuth(),
        token: handler.getToken(),
        updateAuth: updateUserAuth,
    }
}

export default useAuth;