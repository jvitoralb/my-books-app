import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import handleNoteStorage from '../../../utils/noteStorage';


const useLogout = () => {
    const navigate = useNavigate();
    const { logoutUser } = useAuth();
    const handler = handleNoteStorage();

    const handleLogout = () => {
        logoutUser();
        handler.clearAllInfo();
        navigate('/login');
    }

    return {
        handleLogout
    }
}

export default useLogout;