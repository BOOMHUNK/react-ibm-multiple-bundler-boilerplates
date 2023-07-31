import { useState, useEffect } from 'react';

function useWindowResize() {
    const [windowSize, setWindowSize] = useState<{ width: number | undefined, height: number | undefined }>({
        width: undefined,
        height: undefined
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}

export default useWindowResize;