import axiosInstance from './config';
import { LoginCredentials, UserAuth, SignupUserData } from '../types';


export const login = async (userCredentials: LoginCredentials): Promise<UserAuth> => {
    const { data } = await axiosInstance.post('/auth/login', userCredentials);
    return data;
}

export const register = async (userData: SignupUserData): Promise<UserAuth> => {
    const { data } = await axiosInstance.post('/auth/register', userData);
    return data;
}
