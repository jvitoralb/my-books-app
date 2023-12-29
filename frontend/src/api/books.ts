import { BookInfo, BookInfoUpdates, BookNote } from '../types';
import axiosInstance from './config';


export const getAllBooks = async (): Promise<BookNote[]> => {
    const { data } = await axiosInstance.get('/books');
    return data;
}

export const createBook = async (info: BookInfo): Promise<BookNote> => {
    const { data } = await axiosInstance.post('/books', info);
    return data;
}

export const updateBookInfo = async ({ id, ...info }: BookInfoUpdates): Promise<void> => {
    await axiosInstance.put(`/books/${id}/info`, info);
}

export const deleteBook = async (id: string) => {
    await axiosInstance.delete(`/books/${id}`);
}