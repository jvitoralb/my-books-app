import { useEffect, useState } from 'react';

type SidebarResponsive = {
    checked: boolean;
}

const useSidebarResponsive = ({ checked }: SidebarResponsive) => {
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
        setState((prevState) => ({
            ...prevState,
            open: checked
        }));
    }, [checked]);

    return {
        isOpen: state.open,
        isResponsiveSize: state.active,
    }
}

export default useSidebarResponsive;