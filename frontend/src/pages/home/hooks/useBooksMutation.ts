import { useMutation } from '@tanstack/react-query';
import { createBook, deleteBook, updateBookInfo } from '../../../api/books';
import handleNoteStorage from '../../../utils/noteStorage';


const useBooksMutation = () => {
    const createMutation = useMutation({
        mutationFn: createBook,
    });
    const deleteMutation = useMutation({
        mutationFn: deleteBook,
    });
    const updateMutation = useMutation({
        mutationFn: updateBookInfo
    });

    const createBookNote = () => {
        createMutation.mutate({ title: 'New book note' });
    }
    const updateBookNote = (noteId: string) => {
        const noteInfo = handleNoteStorage().getAllInfo(noteId);

        updateMutation.mutate({
            id: noteId,
            ...noteInfo
        });
    }
    const deleteBookNote = (noteId: string) => {
        deleteMutation.mutate(noteId);
    }

    return {
        createBookNote,
        createStatus: createMutation.status,
        newNote: createMutation.data,
        updateBookNote,
        updateStatus: updateMutation.status,
        deleteBookNote,
        deleteStatus: deleteMutation.status,
    }
}

export default useBooksMutation;