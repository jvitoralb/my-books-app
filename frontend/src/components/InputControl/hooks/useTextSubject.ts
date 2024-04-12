import { useState } from 'react';
import { InputSubject } from '../types';


const useTextSubject = (subject: InputSubject, isInvalid: boolean, warningMessage: string, customText?: string) => {
    const [ currentText, setCurrentText ] = useState('');

    const textOnSuject = () => {
        if (customText === '') return '';
        if (customText) return customText;

        const textsOnSujects = {
            name: '',
            email: 'We\'ll never share your email.',
            new_email: 'Should not match your email.',
            confirm_new_email: 'Should match your new email.',
            password: 'We\'ll never ask for your password.',
            new_password: 'We\'ll never ask for your password.',
            confirm_new_password: 'Should match your new password.',
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