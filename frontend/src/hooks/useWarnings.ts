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

    const handleWarnings = (warnFields: FieldsArray | null) => {
        if (warnFields !== null) {
            let emailMsg = '';
            let passwordMsg = '';

            if (warnFields[0] !== null) {
                if (isValid === false) emailMsg = 'Invalid email!';
                if (isError === true) emailMsg = 'Email does not exists!';
            }
            if (warnFields[1] !== null) {
                if (isValid === false) passwordMsg = 'Invalid password!';
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