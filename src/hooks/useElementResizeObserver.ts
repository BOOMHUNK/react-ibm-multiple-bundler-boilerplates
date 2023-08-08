import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import useDebouncedCallback from './useDebounce';

type Size = {
  width: number;
  height: number;
};

export default function useElementResizeObserver(
  element: HTMLElement | undefined | null,
  delay = 0
): Size {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  const observer = useRef<ResizeObserver>();

  const handleResize = useCallback(
    (entries: ResizeObserverEntry[]) => {
      const { width, height } = entries[0].contentRect;

      // Only update if size changed
      if (width !== size.width || height !== size.height) {
        setSize({ width, height });
      }
    },
    [element, size, setSize]
  );

  // Debounced resize handler
  const debouncedHandleResize = useDebouncedCallback(handleResize, delay);

  useLayoutEffect(() => {
    if (element) {
      observer.current = new ResizeObserver(debouncedHandleResize);
      observer.current.observe(element);
    }

    return () => observer.current?.disconnect();
  }, [element, debouncedHandleResize]);

  return size;
}
