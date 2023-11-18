import { useState } from 'react';
import { InputSubject } from '../types';

type SubjectTexts = {
    name: '';
    email: string;
    new_email: string;
    confirm_new_email: string;
    password: string;
    confirm_password: string;
}

const useTextSubject = (subject: InputSubject, isInvalid: boolean, warningMessage: string, customText?: string) => {
    const [ currentText, setCurrentText ] = useState('');

    const textOnSuject = () => {
        if (customText === '') return '';

        const textsOnSujects: SubjectTexts = {
            name: '',
            email: 'We\'ll never share your email.',
            new_email: 'Should not match your email.',
            confirm_new_email: 'Should match your new email.',
            password: 'We\'ll never ask for your password.',
            confirm_password: 'Passwords should match.'
        }

        return textsOnSujects[subject];
    }

    const getText = () => {
        let text = '';

        if (isInvalid) {
            text = warningMessage;
        } else {
            text = textOnSuject();
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