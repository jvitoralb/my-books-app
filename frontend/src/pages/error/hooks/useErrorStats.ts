import { useEffect, useState } from 'react';
import { isRouteErrorResponse } from 'react-router-dom';

const useErrorStats = (error: unknown) => {
    const [ errorStats, setErrorStats ] = useState({
        message: 'Something went wrong!',
        statusCode: 500,
    });

    useEffect(() => {
        if (isRouteErrorResponse(error)) {
            setErrorStats((prev) => ({
                ...prev,
                statusCode: error.status,
                message: error.data,
            }));
        }
    }, []);

    return {
        statusCode: errorStats.statusCode,
        message: errorStats.message,
    };
}

export default useErrorStats;