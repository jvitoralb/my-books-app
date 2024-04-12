import { useState } from 'react';
import { FieldsArrayPswd } from '../types';


const useWarningsPasswordSettings = (isValid: boolean, isError: boolean) => {
    const [warnings, setWarnings] = useState({
        display: false,
        newPassword: '',
        confirmNewPassword: ''
    });
    
    const set = (display: boolean, newPassword: string, confirmNewPassword: string) => {
        setWarnings({
            display,
            newPassword,
            confirmNewPassword
        });
    }

    const handleWarnings = (warnFields: FieldsArrayPswd | null) => {
        if (warnFields !== null) {
            let newPswd = '';
            let confirmNewPswd = '';

            if (warnFields[0] !== null) {
                if (isValid === false) newPswd = 'Minimum password length is 8!';
                if (isError === true) newPswd = 'Invalid Password!';
            }
            if (warnFields[1] !== null) {
                if (isValid === false) {
                    newPswd = 'Passwords does not match!';
                    confirmNewPswd = 'Passwords does not match!';
                }
                if (isError === true) {
                    newPswd = 'Invalid Password!';
                    confirmNewPswd = 'Invalid Password!';
                }
            }

            set(true, newPswd, confirmNewPswd);
        } else {
            set(false, '', '');
        }
    }

    return {
        handleWarnings: handleWarnings,
        displayWarning: warnings.display,
        newPswdWarning: warnings.newPassword,
        confirmNewPswdWarning: warnings.confirmNewPassword
    }
}

export default useWarningsPasswordSettings;