import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';


const useLogout = () => {
    const navigate = useNavigate();
    const { logoutUser } = useAuth();

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    }

    return {
        handleLogout
    }
}

export default useLogout;