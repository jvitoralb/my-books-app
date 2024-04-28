import { useRef, useEffect } from 'react';


const useWelcome = () => {
    const welcomeHeadingRef = useRef<HTMLHeadingElement>(null);
    const linksContainerRef = useRef<HTMLDivElement>(null);
    const aboutSectionRef = useRef<HTMLDivElement>(null);

    const aboutSectionScrollLink = () => {
        aboutSectionRef.current!.scrollIntoView({ behavior: 'smooth' });
    }
    const addDisplayEffectClass = (reference: React.RefObject<HTMLHeadingElement | HTMLDivElement>) => {
        reference.current!.classList.add('display-effect-end');
    }
    const addLinksClass = () => {
        const linksList = linksContainerRef.current!.children;
        for (let i = 0; i < linksList.length; i++) {
            linksList[i].classList.add('welcome-links');
        }
    }

    useEffect(() => {
        const heading = setTimeout(() => {
            addDisplayEffectClass(welcomeHeadingRef);
        }, 600);
        const linksContainer = setTimeout(() => {
            addDisplayEffectClass(linksContainerRef);
            addLinksClass();
        }, 750);

        return () => {
            clearTimeout(heading);
            clearTimeout(linksContainer);
        }
    }, []);

    return {
        welcomeHeadingRef,
        linksContainerRef,
        aboutSectionRef,
        aboutSectionScrollLink,
    }
}

export default useWelcome;