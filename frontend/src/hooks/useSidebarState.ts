import { useEffect, useState } from 'react';


const useSidebar = () => {
    const [ state, setState ] = useState({
        open: false,
        active: false
    });

    useEffect(() => {
        if (window.innerWidth > 920) return;

        const handleResize = () => {
            if (window.innerWidth < 920) {
                setState((prevState) => ({
                    ...prevState,
                    active: true
                }));
                return;
            }
            setState((prevState) => ({
                ...prevState,
                active: false
            }));
        }

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [window.innerWidth]);

    const hamburguerHandler = () => {
        setState((prevState) => ({
            ...prevState,
            open: !prevState.open
        }));
    }

    return {
        watchingResize: state.active,
        sidebarOpen: state.open,
        sidebarHamburguerHandler: hamburguerHandler,
    }
}

export default useSidebar;