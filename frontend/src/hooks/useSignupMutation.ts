import { useMutation } from '@tanstack/react-query';
import { createUser } from '../api/api';


const useSignupMutation = () => {
    const { data, mutate, mutateAsync } = useMutation({
        mutationFn: createUser
    });
// tem que ver a diferença entre mutate e mutateasync
    return {
        data,
        mutate,
        mutateAsync
    }
}

export default useSignupMutation;