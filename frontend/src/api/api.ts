import axios from 'axios';
import { LoginCredentials, User, UserAuth } from '../types';

type LoginQueryKey = {
    queryKey: (string | LoginCredentials)[];
}

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/v1/',
    timeout: 1000,
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
