import { useEffect, useState } from 'react';
import { FieldsArrayEmails } from '../types';

type EmailSettingsConfig = {
    email: string;
    new_email: string;
    confirm_new_email: string;
    isValid: boolean,
    fields: FieldsArrayEmails
}

const useEmailSettings = (updateSuccess: boolean) => {
    const [config, setConfig] = useState<EmailSettingsConfig>({
        email: '',
        new_email: '',
        confirm_new_email: '',
        isValid: true,
        fields: [null, null]
    });

    useEffect(() => validate(), [config.email, config.new_email, config.confirm_new_email]);
    useEffect(() => { if (updateSuccess) stateReset(); }, [updateSuccess]);

    const validate = () => {
        let fieldsMock: FieldsArrayEmails = [null, null];

        if (config.email === config.new_email) {
            fieldsMock[0] = 'email';
        } else {
            fieldsMock[0] = null;
        }

        if (config.new_email !== config.confirm_new_email) {
            fieldsMock[1] = 'confirm_email';
        } else {
            fieldsMock[1] = null;
        }

        setConfig((prevData) => ({
            ...prevData,
            isValid: (fieldsMock[0] === null && fieldsMock[1] === null) ? true : false,
            fields: fieldsMock
        }))
    }

    const dataSetter = (name: string, value: string) => {
        setConfig((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const stateReset = () => {
        setConfig((prevData) => ({
            ...prevData,
            email: '',
            new_email: '',
            confirm_new_email: ''
        }));
    }

    return {
        emailState: {
            email: config.email,
            new_email: config.new_email,
            confirm_new_email: config.confirm_new_email,
        },
        setEmailValues: dataSetter,
        emailIsValid: config.isValid,
        emailFields: config.fields,
    }
}

export default useEmailSettings;