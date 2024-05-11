import axios from 'axios';
import handleAuth from '../utils/auth';

const serverBaseUrl = import.meta.env.PROD ? import.meta.env.VITE_PROD_URL : import.meta.env.VITE_DEV_URL;

const axiosInstance = axios.create({
    baseURL: serverBaseUrl,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
});

const USER_LOGIN_URL = '/auth/login';
const USER_REGISTER_URL = '/auth/register';
const publicUrls: [string, string] = [USER_LOGIN_URL, USER_REGISTER_URL];
const authHandler = handleAuth();

axiosInstance.interceptors.request.use(function(config) {
    if (config.url && !publicUrls.includes(config.url)) {
        config.headers['Authorization'] = 'Bearer ' + authHandler.getToken();
    }
    return config;
});

export default axiosInstance;