import { useEffect, useState } from 'react';
import { MutationStatus } from '@tanstack/react-query';
import { BookNote } from '../types';
import handleNoteStorage from '../utils/noteStorage';

type WorkspaceManager = {
    notes: BookNote[];
    createNoteStatus: MutationStatus;
    newNote: BookNote | undefined;
    deleteNoteStatus: MutationStatus;
}

const useWorkspaceManager = ({ notes, createNoteStatus, newNote, deleteNoteStatus }: WorkspaceManager) => {
    const [note, setNote] = useState<BookNote | null>(null);
    const storageHandler = handleNoteStorage();

    useEffect(() => {
        if (createNoteStatus === 'success' && newNote) {
            selectNote(newNote.id);
        } else if (deleteNoteStatus === 'success') {
            storageHandler.deleteAllInfo(note!.id);
            resetNote();
        }
    }, [notes, createNoteStatus, deleteNoteStatus]);

    const selectNote = (id: string) => {
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id === id) {
                setNote(notes[i]);
                storageHandler.setAllInfo(notes[i].id, {
                    title: notes[i].title,
                    author: notes[i].author || '',
                    about: notes[i].about,
                });
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