import { useEffect, useState } from 'react';
import { isRouteErrorResponse } from 'react-router-dom';

type CustomMessages = {
    400: string;
    404: string;
    500: string;
    isKey: (val: string | number) => val is keyof CustomMessages;
    getMessage: (num: number) => string;
}

const useErrorStats = (error: unknown) => {
    const [ errorStats, setErrorStats ] = useState({
        message: '',
        statusCode: Number(),
    });

    const customMessages: CustomMessages = {
        400: 'This is a Bad Request...',
        404: 'The page you\'re looking for doesn\'t exist...',
        500: 'Something went wrong. Please try again later!',
        isKey: function(val: string | number): val is keyof CustomMessages {
            return val in customMessages;
        },
        getMessage: function(num: number): string {
            if (this.isKey(num)) {
                return this[num];
            }
            return this[500];
        }
    }

    const setter = (statusCode: number) => {
        setErrorStats((prev) => ({
            ...prev,
            statusCode,
            message: customMessages.getMessage(statusCode),
        }));
    }

    useEffect(() => {
        if (isRouteErrorResponse(error)) {
            setter(error.status);
        } else {
            setter(500);
        }
    }, []);

    return {
        statusCode: errorStats.statusCode,
        message: errorStats.message,
    };
}

export default useErrorStats;