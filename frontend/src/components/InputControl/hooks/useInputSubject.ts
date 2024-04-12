import { useState, useEffect } from 'react';
import { InputSubject } from '../../../types';
import { treatLabels } from '../../../utils/strings';

type SubjectConfig = {
    isInvalid: boolean;
    warningMessage: string;
    defaultLabel: string;
    defaultPlaceHolder: string;
}

type InputSubjectOptions = {
    subject: InputSubject;
    displayWarning: boolean;
    subjectWarning: string;
}

const defaultPlaceholders = {
    email: 'my@email.com',
    new_email: 'new@email.com',
    confirm_new_email: '',
    name: 'Jane Doe',
    password: '',
    confirm_password: '',
    new_password: '',
    confirm_new_password: '',
}

const useInputSubject = ({ subject, displayWarning, subjectWarning }: InputSubjectOptions): SubjectConfig => {
    const [ subjectConfig, setSubjectConfig ] = useState<SubjectConfig>({
        isInvalid: false,
        warningMessage: '',
        defaultLabel: treatLabels(subject),
        defaultPlaceHolder: defaultPlaceholders[subject]
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