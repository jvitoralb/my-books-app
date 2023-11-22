import React, { useEffect, useState } from 'react';
import { CustomAxiosError } from '../types';


const useSettingsStatusHandler = (isError: boolean, error: CustomAxiosError, isSuccess: boolean) => {
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
            setElemChildren('Email updated successfully!');
        } else {
            setStatusElem(null);
        }
    }, [isError, isSuccess]);

    return {
        statusElem
    };
}

export default useSettingsStatusHandler;