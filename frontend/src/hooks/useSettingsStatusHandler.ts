import React, { useEffect, useState } from 'react';
import { CustomAxiosError } from '../types';
import { firstCharToUpper } from '../utils/strings';

type SettingsStatus = {
    area: 'email' | 'password';
    isError: boolean;
    error: CustomAxiosError;
    isSuccess: boolean
}

const useSettingsStatusHandler = ({ area, isError, error, isSuccess }: SettingsStatus) => {
    const [ statusElem, setStatusElem ] = useState<JSX.Element | null>(null);

    const setElemChildren = (children: string) => {
        setStatusElem(() => React.createElement('p', {
            className: isError ? 'error-message' : '',
            children: children
        }));
    }

    useEffect(() => {
        let response = error?.response;

        if (isError) {
            if (response?.status === 400) {
                setElemChildren(response.data.error);
            } else {
                setElemChildren('Something went wrong. Please try again later!');
            }
        } else if (isSuccess) {
            setElemChildren(`${firstCharToUpper(area)} updated successfully!`);
        } else {
            setStatusElem(null);
        }
    }, [isError, isSuccess]);

    return {
        statusElem
    };
}

export default useSettingsStatusHandler;