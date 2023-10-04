import { useState, useEffect } from 'react';
import { LoginInputSubject } from '../types';

type SubjectConfig = {
    isInvalid: boolean;
    warningMessage: string;
    defaultLabel: string;
    defaultPlaceHolder: string;
}

type InputSubjectOptions = {
    subject: LoginInputSubject;
    displayWarning: boolean;
    subjectWarning: string;
}

const useInputSubject = ({ subject, displayWarning, subjectWarning }: InputSubjectOptions): SubjectConfig => {
    const [ subjectConfig, setSubjectConfig ] = useState<SubjectConfig>({
        isInvalid: false,
        warningMessage: '',
        defaultLabel: subject.charAt(0).toLocaleUpperCase() + subject.slice(1),
        defaultPlaceHolder: subject === 'email' ? 'my@email.com' : ''
    });

    const set = (msg: string, valid: boolean) => {
        setSubjectConfig((prev) => ({
            ...prev, 
            isInvalid: valid,
            warningMessage: msg
        }));
    }

    const isSubjectInvalid = displayWarning && subjectWarning !== '';

    useEffect(() => {
        set(subjectWarning, isSubjectInvalid);
    }, [isSubjectInvalid]);

    return subjectConfig;
};

export default useInputSubject;