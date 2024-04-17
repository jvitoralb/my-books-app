import { useState } from 'react';


const useSidebarState = () => {
    const [state, setState] = useState({
        isOpen: false,
        isActive: false
    });

    const setIsOpen = (val: boolean) => {
        setState((prev) => ({
            ...prev,
            isOpen: val
        }));
    }
    const setIsActive = (val: boolean) => {
        setState((prev) => ({
            ...prev,
            isActive: val
        }));
    }

    return {
        setIsOpen,
        isSidebarOpen: state.isOpen,
        setIsActive,
        isSidebarResponsiveSize: state.isActive,
    }
}

export default useSidebarState;