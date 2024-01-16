import { MutationStatus } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { BookNote } from '../types';

type DisabledConfig = {
    updateNote: string | null;
    deleteNote: string | null;
}
type DisabledNotesStatus = {
    notes: BookNote[];
    selectedUpdateNote: BookNote | null | undefined;
    updateStatus: MutationStatus;
    selectedDeleteNote: BookNote | null | undefined;
    deleteStatus: MutationStatus;
}

const useNotesOnChange = ({ notes, updateStatus, selectedUpdateNote, deleteStatus, selectedDeleteNote }: DisabledNotesStatus) => {
    const [config, setConfig] = useState<DisabledConfig>({
        updateNote: null,
        deleteNote: null,
    });

    useEffect(() => {
        if (updateStatus === 'loading' && selectedUpdateNote) {
            setter('updateNote', selectedUpdateNote.id);
        } else {
            setter('updateNote', null);
        }
    }, [updateStatus, selectedUpdateNote]);
    useEffect(() => {
        if (deleteStatus === 'loading' && selectedDeleteNote) {
            setter('deleteNote', selectedDeleteNote.id);
        } else if (deleteStatus === 'success' && !notes.some((nt) => nt.id === config.deleteNote)) {
            setter('deleteNote', null);
        }
    }, [notes, deleteStatus, selectedDeleteNote]);

    const setter = (field: string, value: string | null) => {
        setConfig((prevConfig) => ({
            ...prevConfig,
            [field]: value
        }));
    }

    const isEditing = (currentNoteId: string) => {
        if (config.updateNote === currentNoteId || config.deleteNote === currentNoteId) {
            return true;
        }
        return false;
    }

    return {
        isEditing,
        updateNoteId: config.updateNote,
        deleteNoteId: config.deleteNote,
    }
}

export default useNotesOnChange;