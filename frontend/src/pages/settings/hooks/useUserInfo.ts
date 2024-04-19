import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from '../../../api/users';
import { User } from '../../../types';

const useUserInfo = (loaderUserInfo: User) => {
    const [ userInfo, setUserInfo ] = useState<User>(loaderUserInfo);

    const {
        refetch,
        data,
    } = useQuery({
        queryKey: ['user'],
        queryFn: getUserInfo,
        enabled: false,
    });

    useEffect(() => {
        if (data) setUserInfo(data);
    }, [data]);

    const refreshUserInfo = () => {
        refetch();
    }

    return {
        user: userInfo,
        refreshUserInfo
    }
}

export default useUserInfo;