import { useMutation } from '@tanstack/react-query';
import { createUser } from '../api/api';


const useSignupMutation = () => {
    const { data, mutate } = useMutation({
        mutationFn: createUser
    });

    return {
        data,
        mutate
    }
}

export default useSignupMutation;