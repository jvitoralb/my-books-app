import { useEffect, useState } from 'react';
import { FieldsArrayPswd } from '../../../types';
import { MutationStatus } from '@tanstack/react-query';

type PasswordSettingsConfig = {
    new_password: string;
    confirm_new_password: string;
    fields: FieldsArrayPswd;
    isValid: boolean;
}

const usePasswordSettings = (mutationStatus: MutationStatus) => {
    const [ config, setConfig ]  = useState<PasswordSettingsConfig>({
        new_password: '',
        confirm_new_password: '',
        fields: [null, null],
        isValid: true
    });

    useEffect(() => validate(), [config.new_password, config.confirm_new_password]);
    useEffect(() => { if (mutationStatus === 'success') stateReset() }, [mutationStatus]);

    const validate = () => {
        let fieldsMock: FieldsArrayPswd = [null, null];

        if (config.new_password.length < 8) {
            fieldsMock[0] = 'password';
        } else {
            fieldsMock[0] = null;
        }

        if (config.new_password !== config.confirm_new_password) {
            fieldsMock[1] = 'confirm_password';
        } else {
            fieldsMock[1] = null;
        }

        setConfig((prevData) => ({
            ...prevData,
            isValid: (fieldsMock[0] === null && fieldsMock[1] === null) ? true : false,
            fields: fieldsMock
        }));
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
            new_password: '',
            confirm_new_password: ''
        }));
    }

    return {
        pswdState: {
            new_password: config.new_password,
            confirm_new_password: config.confirm_new_password
        },
        setPswdValues: dataSetter,
        pswdIsValid: config.isValid,
        pswdFields: config.fields
    }
}

export default usePasswordSettings;