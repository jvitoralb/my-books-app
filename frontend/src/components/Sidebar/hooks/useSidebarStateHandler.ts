import { useEffect } from 'react';

type UseSidebarState = {
    setIsOpen: (val: boolean) => void;
    setIsActive: (val: boolean) => void;
    isResponsiveSize: boolean;
    isOpen: boolean;
}

const useSidebarStateHandler = ({ setIsOpen, setIsActive, isResponsiveSize, isOpen }: UseSidebarState) => {
    useEffect(() => {
        setIsActive(isResponsiveSize);
    }, [isResponsiveSize]);

    useEffect(() => {
        setIsOpen(isOpen);
    }, [isOpen]);
}

export default useSidebarStateHandler;