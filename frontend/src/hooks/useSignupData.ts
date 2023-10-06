import { useEffect, useState } from 'react';
import { FieldsArray, SignupData } from '../types';

type SignupDataValidation = {
    isValid: boolean;
    fields: FieldsArray;
}

const useSignupData = () => {
    const [ data, setData ] = useState<SignupData>({
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    const [ validation, setValidation ] = useState<SignupDataValidation>({
        isValid: false,
        fields: [ null, null ]
    });

    useEffect(() => validate(), [data]);

    const validate = () => {
        let fieldsMock: FieldsArray = [null, null];

        if (data.email.match(/^\S+[@]\S+[.]\S+$/) === null) {
            fieldsMock[0] = 'email';
        } else {
            fieldsMock[0] = null;
        }
    
        if (data.password.length < 8) {
            fieldsMock[1] = 'password';
        } else if (data.password !== data.confirm_password) {
            fieldsMock[1] = 'confirm_password';
        } else {
            fieldsMock[1] = null;
        }

        setValidation({
            isValid: (fieldsMock[0] === null && fieldsMock[1] === null) ? true : false,
            fields: fieldsMock
        });
    }

    const dataSetter = (name: string, value: string) => {
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }
    
    return {
        signupData: data,
        setSignupData: dataSetter,
        isValid: validation.isValid,
        fields: validation.fields,
    };
}

export default useSignupData;