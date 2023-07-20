import { RefObject, useEffect,  useRef, useState } from 'react';

interface Size {
  width: number;
  height: number;
}

function useResizeObserver<T extends HTMLElement = HTMLDivElement>(): [
  RefObject<T>,
  Size,
] {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const ref = useRef<T>(null);

  const handleResize = (entries: ResizeObserverEntry[]) => {
    if (!entries.length) return;
    const { width, height } = entries[0].contentRect;
    setSize({ width, height });
  };

  useEffect(() => {
    const element = ref.current;
    if (element) {
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(element);
      return () => resizeObserver.disconnect();
    }
  }, [ref]);

  return [ref, size];
}

export default useResizeObserver;