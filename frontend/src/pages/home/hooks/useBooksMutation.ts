import { useMutation } from '@tanstack/react-query';
import { createBook, deleteBook, updateBookInfo, updateBookSection } from '../../../api/books';
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
    const updateSectionMutation = useMutation({
        mutationFn: updateBookSection
    });

    const createBookNote = () => {
        createMutation.mutate({ title: 'New book note' });
    }
    const updateBookNote = (noteId: string) => {
        const { section, ...noteInfo } = handleNoteStorage().getAllInfo(noteId);
        
        updateMutation.mutate({
            id: noteId,
            ...noteInfo
        });
        updateSectionMutation.mutate({
            id: noteId,
            section: section,
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