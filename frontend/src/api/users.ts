import { AxiosResponse } from 'axios';
import axiosInstance from './config';
import { EmailUpdates, LoginCredentials, PasswordUpdates, SignupUserData, User, UserAuth } from '../types';


export const login = async (userCredentials: LoginCredentials): Promise<UserAuth> => {
    const { data } = await axiosInstance.post('/users/login', userCredentials);
    return data;
}

export const register = async (userData: SignupUserData): Promise<UserAuth> => {
    const { data } = await axiosInstance.post('/users/register', userData);
    return data;
}

export const getUserInfo = async (): Promise<User> => {
    const { data } = await axiosInstance.get('/users');
    return data;
}

export const updateUserEmail = async (updates: EmailUpdates): Promise<UserAuth> => {
    const { data } = await axiosInstance.put('/users/email', updates);
    return data;
}

export const updateUserPassword = async (updates: PasswordUpdates): Promise<AxiosResponse> => {
    return await axiosInstance.put('/users/password', updates);
}
