import { useEffect, useRef, useState } from 'react';

type OutsideClick = {
    isResponsiveSize: boolean;
    isOpen: boolean;
    setInputChecked: (val: boolean) => void;
}

const useOutsideClick = ({ isResponsiveSize, isOpen, setInputChecked }: OutsideClick) => {
    const navRef = useRef<HTMLElement>(null);
    const hamburguerMenuRef = useRef<HTMLLabelElement>(null);
    const [ outsideClick, setOutsideClick ] = useState(false);

    useEffect(() => {
        function outsideClickHandler(e: MouseEvent) {
            if ((navRef.current && !navRef.current.contains(e.target as Node)) &&
                (hamburguerMenuRef.current && !hamburguerMenuRef.current.contains(e.target as Node))) {
                setOutsideClick(true);
            } else {
                setOutsideClick(false);
            }
        }

        document.addEventListener('mousedown', outsideClickHandler);
        return () => {
            document.removeEventListener('mousedown', outsideClickHandler);
        };
    }, []);

    useEffect(() => {
        if (outsideClick && isResponsiveSize && isOpen) {
            setInputChecked(false);
        }
    }, [outsideClick]);

    return {
        navRef,
        hamburguerMenuRef,
        outsideClick: false,
    }
}

export default useOutsideClick;