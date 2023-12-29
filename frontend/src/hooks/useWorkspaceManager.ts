import { useEffect, useState } from 'react';
import { MutationStatus } from '@tanstack/react-query';
import handleNoteStorage from '../utils/noteStorage';
import { BookNote } from '../types';

type WorkspaceManager = {
    notes: BookNote[];
    createNoteStatus: MutationStatus;
    newNote: BookNote | undefined;
    updateNoteStatus: MutationStatus;
    deleteNoteStatus: MutationStatus;
}

type ManagerConfig = {
    note: BookNote | null;
    savingNote: BookNote | null;
}

const useWorkspaceManager = ({ notes, createNoteStatus, newNote, updateNoteStatus, deleteNoteStatus }: WorkspaceManager) => {
    const [config, setConfig] = useState<ManagerConfig>({
        note: null,
        savingNote: null,
    });
    const storageHandler = handleNoteStorage();

    useEffect(() => {
        if (createNoteStatus === 'success' && newNote) {
            selectNote(newNote.id);
        } else if (deleteNoteStatus === 'success') {
            storageHandler.deleteAllInfo(config.note?.id || '');
            resetNote();
        }
    }, [notes, createNoteStatus, deleteNoteStatus]);

    useEffect(() => {
        if (updateNoteStatus === 'loading') {
            setConfig((prevConfig) => ({
                ...prevConfig,
                savingNote: prevConfig.note
            }));
        } else {
            setConfig((prevConfig) => ({
                ...prevConfig,
                savingNote: null
            }));
        }
    }, [updateNoteStatus]);

    const selectNote = (id: string) => {
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id === id) {
                setConfig((prevConfig) => ({
                    ...prevConfig,
                    note: notes[i]
                }));
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
        setConfig((prevConfig) => ({
            ...prevConfig,
            note: null
        }));
    }

    return {
        selectNote,
        selectedNote: config.note,
        selectedUpdateNote: config.savingNote,
    }
}

export default useWorkspaceManager;