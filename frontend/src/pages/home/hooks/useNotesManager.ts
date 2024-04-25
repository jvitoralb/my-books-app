import { useEffect, useState } from 'react';
import { MutationStatus } from '@tanstack/react-query';
import { BookNote, BooksUseQueryRefetch } from '../../../types';

type NotesManager = {
    notes: BookNote[];
    createStatus: MutationStatus;
    newNote: BookNote | undefined;
    updateStatus: MutationStatus;
    deleteStatus: MutationStatus;
    fetchBooks: BooksUseQueryRefetch;
    fetchResult: BookNote[] | undefined;
}

const useNotesManager = ({ notes, createStatus, newNote, updateStatus, deleteStatus, fetchBooks, fetchResult }: NotesManager) => {
    const [notesTracked, setNotesTracked] = useState([...notes]);

    useEffect(() => {
        if (createStatus === 'success' && newNote) {
            setNotesTracked((lastUpdate) => [
                newNote,
                ...lastUpdate,
            ]);
        }
    }, [createStatus]);
    useEffect(() => {
        if (updateStatus === 'success') {
            fetchBooks();
        }
    }, [updateStatus]);
    useEffect(() => {
        if (deleteStatus === 'success') {
            fetchBooks();
        }
    }, [deleteStatus]);
    useEffect(() => {
        if (fetchResult) {
            setNotesTracked([...fetchResult]);
        }
    }, [fetchResult]);

    return notesTracked;
}

export default useNotesManager;