type NoteInfo = {
    title: string;
    author: string | null;
    about: string | null;
}

type NoteInfoKeys = keyof NoteInfo;

const handleNoteStorage = () => {
    const getText = (key: string) => {
        return localStorage.getItem(key);
    }
    const getAllInfo = (noteId: string): NoteInfo => {
        const noteProps: NoteInfoKeys[] = ['title', 'author', 'about'];
        const noteInfo: NoteInfo = {
            title: '',
            author: null,
            about: null
        };

        noteProps.forEach((prop) => {
            let text = localStorage.getItem(`${prop}_${noteId}`); 
            if (text) noteInfo[prop] = text;
        });

        return noteInfo;
    }

    const setText = (key: string, value: string) => {
        localStorage.setItem(key, value);
    }
    const setAllInfo = (noteId: string, noteInfo: NoteInfo) => {
        for(const prop in noteInfo) {
            localStorage.setItem(`${prop}_${noteId}`, (noteInfo[prop as NoteInfoKeys] || ''));
        }
    }

    const deleteText = (key: string) => {
        localStorage.removeItem(key);
    }
    const deleteAllInfo = (noteId: string) => {
        const noteProps: NoteInfoKeys[] = ['title', 'author', 'about'];
        noteProps.forEach((prop) => {
            localStorage.removeItem(`${prop}_${noteId}`); 
        });
    }

    return {
        getText,
        getAllInfo,
        setText,
        setAllInfo,
        deleteText,
        deleteAllInfo,
    }
}

export default handleNoteStorage;