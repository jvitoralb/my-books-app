import { useNavigate } from "react-router-dom";
import { delAuthData } from "../utils/auth";

const useLogout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        delAuthData();
        navigate('/login');
    }

    return {
        handleLogout
    }
}

export default useLogout;