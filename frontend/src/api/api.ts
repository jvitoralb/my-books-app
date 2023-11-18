import axios from 'axios';
import { EmailUpdates, LoginCredentials, SignupUserData, User, UserAuth } from '../types';

type LoginQueryKey = {
    queryKey: (string | LoginCredentials)[];
}

const serverBaseUrl = import.meta.env.PROD ? import.meta.env.VITE_PROD_URL : import.meta.env.VITE_DEV_URL;

const axiosInstance = axios.create({
    baseURL: serverBaseUrl,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const logUser = async ({ queryKey }: LoginQueryKey): Promise<UserAuth> => {
    const userCredentials = queryKey[queryKey.length - 1];
    const { data } = await axiosInstance.post('/users/login', userCredentials);
    return data;
}

export const getUser = async (authorization: string): Promise<User> => {
    const { data } = await axiosInstance.get('/users', { headers: { 'Authorization': authorization } });
    return data;
}

export const createUser = async (userData: SignupUserData): Promise<UserAuth> => {
    const { data } = await axiosInstance.post('/users/register', userData);
    return data;
}

export const updateUserEmail = async ({ authorization, updates }: { updates: EmailUpdates; authorization: string }): Promise<UserAuth> => {
    const { data } = await axiosInstance.put('/users/email', updates, {
        headers: {
            'Authorization': authorization
        }
    });
    return data;
}
