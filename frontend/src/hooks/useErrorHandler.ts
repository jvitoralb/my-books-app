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

    const warnEmail = (msg: string | undefined): 'email' | null => {
        const triggers = [
            'User does not exists',
            'Email already exists'
        ];
        for(let i = 0; i < triggers.length; i++) {
            if (triggers[i] === msg) return 'email';
        }
        return null;
    }
    const warnPassword = (msg: string | undefined): 'password' | null => {
        const triggers = [ 'Invalid password' ];
        if (triggers[0] === msg) return 'password'
        return null;
    }

    useEffect(() => {
        if (isError) {
            if (badRequest) {
                let resData = response?.data.error;
                let queryWarnFields: FieldsArray = [
                    warnEmail(resData),
                    warnPassword(resData)
                ];
                
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