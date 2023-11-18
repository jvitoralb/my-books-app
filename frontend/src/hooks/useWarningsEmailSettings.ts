import { useState } from 'react';
import { FieldsArrayEmails } from '../types';

type SettingsWarnings = {
    display: boolean;
    email: string;
    newEmail: string;
    confirmNewEmail: string;
}

const useWarningsEmailSettings = (isValid: boolean, isError: boolean) => {
    const [warnings, setWarnings] = useState<SettingsWarnings>({
        display: false,
        email: '',
        newEmail: '',
        confirmNewEmail: ''
    });

    const set = (display: boolean, email: string, newEmail: string, confirmNewEmail: string) => {
        setWarnings({
            display,
            email,
            newEmail,
            confirmNewEmail
        });
    }

    const handleWarnings = (warnFields: FieldsArrayEmails | null) => {
        if (warnFields !== null) {
            let email = '';
            let newEmail = '';
            let confirmNewEmail = '';

            if (warnFields[0] !== null) {
                if (isValid === false) {
                    email = 'Email should not match New email!';
                    newEmail = 'New email should not match email!';
                }
                if (isError === true) {
                    email = 'Email does not exists!';
                }
            }
            if (warnFields[1] !== null) {
                if (isValid === false) {
                    confirmNewEmail = 'Emails does not match!';
                    newEmail = 'Emails does not match!';
                }
                if (isError === true) {
                    newEmail = 'Email already in use!';
                }
            }

            set(true, email, newEmail, confirmNewEmail);
        } else {
            set(false, '', '', '');
        }
    }

    return {
        handleWarnings: handleWarnings,
        displayWarning: warnings.display,
        emailWarning: warnings.email,
        newEmailWarning: warnings.newEmail,
        confirmNewEmailWarning: warnings.confirmNewEmail
    }
}

export default useWarningsEmailSettings;