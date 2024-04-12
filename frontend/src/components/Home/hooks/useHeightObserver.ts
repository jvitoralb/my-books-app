import { useState, useRef, useEffect } from 'react';

const useHeightObserver = () => {
    const [height, setHeight] = useState(0);
    const divBoxObserver = useRef<HTMLDivElement>(null);
    const textAreaObserver = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (!divBoxObserver.current && !textAreaObserver.current) return;

        const resizeObserver = new ResizeObserver(() => {
            if (divBoxObserver.current && divBoxObserver.current.offsetHeight !== height) {
                setHeight(divBoxObserver.current.offsetHeight);
            } else if (textAreaObserver.current && textAreaObserver.current.scrollHeight !== height) {
                setHeight(textAreaObserver.current.scrollHeight);
            }
        });

        if (divBoxObserver.current) {
            resizeObserver.observe(divBoxObserver.current);
        } else if (textAreaObserver.current) {
            resizeObserver.observe(textAreaObserver.current);
        }

        return function cleanup() {
            resizeObserver.disconnect();
        }
    }, [divBoxObserver.current, textAreaObserver.current]);

    return {
        divBoxObserver,
        textAreaObserver,
        height
    }
}

export default useHeightObserver;