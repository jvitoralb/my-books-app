import { useState } from 'react';
import { InputSubject } from '../types';

type SubjectTexts = {
    email: string;
    password: string;
    name: '',
    confirm_password: string
}

const useTextSubject = (subject: InputSubject, isInvalid: boolean, warningMessage: string) => {
    const [ currentText, setCurrentText ] = useState('');

    const textOnSujects: SubjectTexts = {
        email: 'We\'ll never share your email.',
        password: 'We\'ll never ask for your password.',
        name: '',
        confirm_password: 'Passwords should match.'
    }

    const getText = () => {
        let text = '';

        if (isInvalid) {
            text = warningMessage;
        } else {
            text = textOnSujects[subject];
        }
        return text;
    }

    const newText = getText();

    if (currentText !== newText) {
        setCurrentText(newText);
    }

    return {
        subjectText: currentText
    }
}

export default useTextSubject;