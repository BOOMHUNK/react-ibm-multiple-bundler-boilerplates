import { useState, useEffect } from 'react';
import useDebouncedCallback from './useDebounce';

function useWindowResize(delay = 0) {
    const [windowSize, setWindowSize] = useState<{ width: number | undefined, height: number | undefined }>({
        width: undefined,
        height: undefined
    });

    function handleResize() {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }
    const debouncedHandleResize = useDebouncedCallback(handleResize, delay);

    useEffect(() => {
        window.addEventListener('resize', debouncedHandleResize);

        // Initial resize
        debouncedHandleResize();

        return () => window.removeEventListener('resize', debouncedHandleResize);
    }, [debouncedHandleResize]);

    return windowSize;
}

export default useWindowResize;