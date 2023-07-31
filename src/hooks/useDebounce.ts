import { useCallback, useEffect, useRef } from "react";

// Custom debounce hook
export default function useDebouncedCallback<T extends any[]>(callback: (...args: T) => void, delay: number) {
    const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
        }
    }, []);

    return useCallback((...args: T) => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        timeoutId.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);
}
