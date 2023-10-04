import React from 'react';
import { useState, useEffect } from 'react';
import { CustomAxiosError, FieldsArray } from '../types';

type HandlerOptions = {
    errorFields: FieldsArray,
    warnElement: JSX.Element | null;
}

const useErrorHandler = (isError: boolean, error: CustomAxiosError) => {
    const [ options, setOptions ] = useState<HandlerOptions>({
        errorFields: [ null, null ],
        warnElement: null
    });

    let response = error?.response;
    let badRequest = response?.status === 400;

    useEffect(() => {
        if (isError) {
            if (badRequest) {
                let resData = response?.data.error;
                let queryWarnFields: FieldsArray = [ null, null ];
    
                if (resData === 'User does not exists') queryWarnFields[0] = 'email';
                if (resData === 'Invalid password') queryWarnFields[1] = 'password';
                
                setOptions({
                    errorFields: queryWarnFields,
                    warnElement: null
                });
            } else {
                setOptions({
                    errorFields: [ null, null ],
                    warnElement: React.createElement(
                        'p',
                        {
                            className: 'error-message',
                            children: 'Something went wrong. Please try again later!'
                        }
                    )
                });
            }
        } else {
            setOptions({
                errorFields: [ null, null ],
                warnElement: null
            });
        }

    }, [isError]);

    return options;
}

export default useErrorHandler;