import { useState, useEffect } from 'react';
import useDebouncedCallback from './useDebounce';

const BREAKPOINTS = {
    sm: 672,
    md: 1056,
    lg: 1312
}

function useBreakpoints(debounceDelay = 0) {
    const [isSM, setIsSM] = useState(false);
    const [isMD, setIsMD] = useState(false);
    const [isLG, setIsLG] = useState(false);
    const [isXL, setIsXL] = useState(false);

    const handleResize = useDebouncedCallback(() => {
        const mqlSM = window.matchMedia(`(max-width: ${BREAKPOINTS.sm}px)`);
        const mqlMD = window.matchMedia(`(min-width: ${BREAKPOINTS.sm}px) and (max-width: ${BREAKPOINTS.md}px)`);
        const mqlLG = window.matchMedia(`(min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg}px)`);
        const mqlXL = window.matchMedia(`(min-width: ${BREAKPOINTS.lg}px)`);

        setIsSM(mqlSM.matches);
        setIsMD(mqlMD.matches);
        setIsLG(mqlLG.matches);
        setIsXL(mqlXL.matches);
    }, debounceDelay);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
        }
    }, [handleResize]);

    return { sm: isSM, md: isMD, lg: isLG, xl: isXL };

}

export default useBreakpoints;