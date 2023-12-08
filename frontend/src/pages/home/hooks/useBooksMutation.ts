import { useMutation } from '@tanstack/react-query';
import { createBook } from '../../../api/books';
import { BookNote } from '../../../types';

const useBooksMutation = () => {
    const {
        data,
        mutate,
        status,
        error
    } = useMutation({
        mutationFn: createBook
    });

    const createBookNote = () => {
        mutate({ title: 'New book note' });
    }

    return {
        createBookNote,
        createNoteStatus: status,
        newNote: data as BookNote,
        error,
    }
}

export default useBooksMutation;