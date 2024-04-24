import axios from 'axios';
import handleAuth from '../utils/auth';

const serverBaseUrl = import.meta.env.PROD ? import.meta.env.VITE_PROD_URL : import.meta.env.VITE_DEV_URL;

const axiosInstance = axios.create({
    baseURL: serverBaseUrl,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

const USER_LOGIN_URL = '/users/login';
const USER_REGISTER_URL = '/users/register';
const publicUrls: [string, string] = [USER_LOGIN_URL, USER_REGISTER_URL];
const auth = handleAuth();

axiosInstance.interceptors.request.use(function(config) {
    if (config.url && !publicUrls.includes(config.url)) {
        config.headers['Authorization'] = auth.getToken();
    }
    return config;
});

export default axiosInstance;