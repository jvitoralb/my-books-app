import { useState, useEffect } from 'react';
import { LoginInputSubject } from '../types';

type SubjectOptions = {
    warningMsg: string;
    isInputInvalid: boolean;
}

type InputSubjectOptions = {
    subject: LoginInputSubject;
    displayWarning: boolean;
    emailWarning: string;
    passwordWarning: string;
}

const useInputSubject = ({ subject, displayWarning, emailWarning, passwordWarning }: InputSubjectOptions): SubjectOptions => {
    const [ subjectOptions, setSubjectOptions ] = useState<SubjectOptions>({
        warningMsg: '',
        isInputInvalid: false
    });

    const set = (msg: string, valid: boolean) => {
        setSubjectOptions({
            warningMsg: msg,
            isInputInvalid: valid
        });
    }

    const isEmailInvalid = displayWarning && emailWarning !== '';
    const isPasswordInvalid = displayWarning && passwordWarning !== '';

    useEffect(() => {
        if (subject === 'email') {
            set(emailWarning, isEmailInvalid);
        } else if (subject === 'password') {
            set(passwordWarning, isPasswordInvalid);
        }
    }, [isEmailInvalid, isPasswordInvalid]);

    return subjectOptions;
};

export default useInputSubject;