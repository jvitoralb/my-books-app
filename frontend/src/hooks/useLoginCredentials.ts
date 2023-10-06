import { useEffect, useState } from 'react';
import { LoginCredentials, FieldsArray } from '../types';

type LoginValidation = {
    isValid: boolean;
    fields: FieldsArray;
}

const useLoginCredentials = () => {
    const [ loginCredentials, setLoginCredentials ] = useState<LoginCredentials>({
        email: '',
        password: ''
    });

    const [ validation, setValidation ] = useState<LoginValidation>({
        isValid: false,
        fields: [null, null]
    });

    useEffect(() => validate(), [loginCredentials]);

    const validate = () => {
        let msgsMock: FieldsArray = [null, null];

        if (loginCredentials.email.match(/^\S+[@]\S+[.]\S+$/) === null) {
            msgsMock[0] = 'email';
        } else {
            msgsMock[0] = null;
        }

        if (loginCredentials.password.length < 8) {
            msgsMock[1] = 'password';
        } else {
            msgsMock[1] = null;
        }

        setValidation({
            isValid: (msgsMock[0] === null && msgsMock[1] === null) ? true : false,
            fields: msgsMock
        });
    }

    const setCredentials = (inputName: string, inputValue: string) => {
        setLoginCredentials((prevCred) => ({
            ...prevCred,
            [inputName]: inputValue
        }));
    }

    return {
        credentials: loginCredentials,
        setCredentials: setCredentials,
        isValid: validation.isValid,
        fields: validation.fields
    }
}

export default useLoginCredentials;