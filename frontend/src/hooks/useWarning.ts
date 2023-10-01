import { useState } from "react";
import { FieldsArray } from "../types";


const useWarnings = (isValid: boolean, isError: boolean) => {
    const [warnings, setWarnings] = useState({
        display: false,
        email: '',
        password: ''
    });

    const handleWarnings = (warnFields: FieldsArray | null) => {
        let emailMsg = '';
        let passwordMsg = '';

        if (warnFields === null) {
            setWarnings({
                display: false,
                email: emailMsg,
                password: passwordMsg
            });
            return;
        }

        if (warnFields[0] !== null) {
            if (isValid === false) emailMsg = 'Invalid email!';
            if (isError === true) emailMsg = 'Email does not exists';
        }
        if (warnFields[1] !== null) {
            if (isValid === false) passwordMsg = 'Invalid password';
            if (isError === true) passwordMsg = 'Wrong password';
        }

        setWarnings({
            display: true,
            email: emailMsg,
            password: passwordMsg
        });
    }

    return {
        displayWarning: warnings.display,
        emailWarning: warnings.email,
        passwordWarning: warnings.password,
        handleWarnings
    }
}

export default useWarnings;