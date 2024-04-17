import { useEffect, useState } from 'react';


const useSidebarResponsive = (setInputChecked: (val: boolean) => void) => {
    const [ state, setState ] = useState({
        open: false,
        active: false
    });

    useEffect(() => {
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

    useEffect(() => {
        setInputChecked(state.open);
    }, [state.open]);

    const hamburguerHandler = () => {
        setState((prevState) => ({
            ...prevState,
            open: !prevState.open
        }));
    }

    return {
        isOpen: state.open,
        isResponsiveSize: state.active,
        hamburguerHandler: hamburguerHandler,
    }
}

export default useSidebarResponsive;