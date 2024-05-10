import { AxiosResponse } from 'axios';
import axiosInstance from './config';
import { EmailUpdates, PasswordUpdates, User, UserAuth } from '../types';


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
