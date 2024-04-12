import { useEffect, useState } from 'react';
import handleNoteStorage from '../../../utils/noteStorage';

type EditalbeTextNote = {
    noteId: string;
    noteFieldText: string | null;
    noteFieldName: string;
}

const useEditableText = ({ noteId, noteFieldText, noteFieldName }: EditalbeTextNote) => {
    const [editConfig, setEditConfig] = useState({
        valueHandler: handleNoteStorage(),
        value: '',
        isEditing: false,
    });

    useEffect(() => {
        let text = editConfig.valueHandler.getText(`${noteFieldName}_${noteId}`);
        
        if (noteFieldText) {
            setter('value', noteFieldText);
        } else if (text) {
            setter('value', text);
        } else {
            setter('value', '');
        }
    }, [noteId]);

    const setter = (field: string, value: string | boolean) => {
        setEditConfig((prevConfig) => ({
            ...prevConfig,
            [field]: value
        }));
    }

    const switchOn = () => setter('isEditing', true);
    const switchOff = () => setter('isEditing', false);
    const onChange = (field: string, value: string) => {
        editConfig.valueHandler.setText(field, value);
        setter('value', value);
    }

    return {
        switchOn,
        switchOff,
        onChange,
        value: editConfig.value,
        isEditing: editConfig.isEditing,
    }
}

export default useEditableText;