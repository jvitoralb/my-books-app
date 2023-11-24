import { useState } from 'react';
import { FieldsArrayEmails } from '../types';

type SettingsWarnings = {
    display: boolean;
    newEmail: string;
    confirmNewEmail: string;
}

const useWarningsEmailSettings = (isValid: boolean, isError: boolean) => {
    const [warnings, setWarnings] = useState<SettingsWarnings>({
        display: false,
        newEmail: '',
        confirmNewEmail: ''
    });

    const set = (display: boolean, newEmail: string, confirmNewEmail: string) => {
        setWarnings({
            display,
            newEmail,
            confirmNewEmail
        });
    }

    const handleWarnings = (warnFields: FieldsArrayEmails | null) => {
        if (warnFields !== null) {
            let newEmail = '';
            let confirmNewEmail = '';

            if (warnFields[0] !== null) {
                if (isValid === false) newEmail = 'Should not match your current email!';
            }

            if (warnFields[1] !== null) {
                if (isValid === false) {
                    newEmail = 'Emails does not match!';
                    confirmNewEmail = 'Emails does not match!';
                }
                if (isError === true) newEmail = 'Email already in use!';
            }

            set(true, newEmail, confirmNewEmail);
        } else {
            set(false, '', '');
        }
    }

    return {
        handleWarnings: handleWarnings,
        displayWarning: warnings.display,
        newEmailWarning: warnings.newEmail,
        confirmNewEmailWarning: warnings.confirmNewEmail
    }
}

export default useWarningsEmailSettings;