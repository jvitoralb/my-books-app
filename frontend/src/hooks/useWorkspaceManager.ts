import { useEffect, useState } from 'react';
import { MutationStatus } from '@tanstack/react-query';
import { BookNote } from '../types';

type WorkspaceManager = {
    notes: BookNote[];
    createNoteStatus: MutationStatus;
    newNote: BookNote | undefined;
    deleteNoteStatus: MutationStatus;
}

const useWorkspaceManager = ({ notes, createNoteStatus, newNote, deleteNoteStatus }: WorkspaceManager) => {
    const [note, setNote] = useState<BookNote | null>(null);

    useEffect(() => {
        if (createNoteStatus === 'success' && newNote) {
            selectNote(newNote.id);
        } else if (deleteNoteStatus === 'success') {
            resetNote();
        }
    }, [notes, createNoteStatus, deleteNoteStatus]);

    const selectNote = (id: string) => {
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id === id) {
                setNote(notes[i]);
                break;
            }
        }
    }
    const resetNote = () => {
        setNote(null);
    }

    return {
        selectNote,
        selectedNote: note,
    }
}

export default useWorkspaceManager;