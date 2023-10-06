import { useState } from 'react';
import { LoginInputSubject } from '../types';

type SubjectTexts = {
    email: string;
    password: string;
}

const useTextSubject = (subject: LoginInputSubject, isInvalid: boolean, warningMessage: string) => {
    const [ currentText, setCurrentText ] = useState('');

    const textOnSujects: SubjectTexts = {
        email: 'We\'ll never share your email.',
        password: 'We\'ll never ask for your password.'
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