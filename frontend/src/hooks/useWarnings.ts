import { useState } from 'react';
import { FieldsArray } from '../types';

type Warnings = {
    display: boolean;
    email: string;
    password: string;
}

const useWarnings = (isValid: boolean, isError: boolean) => {
    const [warnings, setWarnings] = useState<Warnings>({
        display: false,
        email: '',
        password: ''
    });

    const set = (display: boolean, email: string, password: string) => {
        setWarnings({
            display,
            email,
            password
        });
    }

    const handleWarnings = (warnFields: FieldsArray | null, source?: 'login' | 'signup') => {
        if (warnFields !== null) {
            let emailMsg = '';
            let passwordMsg = '';

            if (warnFields[0] !== null) {
                if (isValid === false) emailMsg = 'Invalid email!';
                if (isError === true) {
                    if (source === 'login') emailMsg = 'Email does not exists!';
                    if (source === 'signup') emailMsg = 'Email already in use!';
                }
            }
            if (warnFields[1] !== null) {
                if (isValid === false) {
                    if (warnFields[1] === 'password') passwordMsg = 'Minimum password length is 8!';
                    if (warnFields[1] === 'confirm_password') passwordMsg = 'Passwords do not match!';
                }
                if (isError === true) passwordMsg = 'Wrong password!';
            }

            set(true, emailMsg, passwordMsg);
        } else {
            set(false, '', '');
        }
    }

    return {
        displayWarning: warnings.display,
        emailWarning: warnings.email,
        passwordWarning: warnings.password,
        handleWarnings
    }
}

export default useWarnings;