import { useState } from 'react';

type SignupData = {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
}

type SignupDataValidation = {
    isValid: boolean;
    error: string;
}

const useSignupData = () => {
    const [ data, setData ] = useState<SignupData>({
        name: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    const dataSetter = (name: string, value: string) => {
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }
    
    return {
        signupData: data,
        setSignupData: dataSetter,
        // isValid: validation.isValid,
        // validationError: validation.error,
        // validate
    };
}

export default useSignupData;