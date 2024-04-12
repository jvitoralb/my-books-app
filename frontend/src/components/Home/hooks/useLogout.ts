import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';


const useLogout = () => {
    const navigate = useNavigate();
    const { finishSession } = useAuth();

    const handleLogout = () => {
        finishSession();
        navigate('/login');
    }

    return {
        handleLogout
    }
}

export default useLogout;