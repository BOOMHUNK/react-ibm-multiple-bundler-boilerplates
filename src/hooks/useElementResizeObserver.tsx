import { useEffect, useRef, useState } from 'react';

type Size = {
  width: number;
  height: number;
};

export default function useElementResizeObserver<T extends HTMLElement>(): [React.RefObject<T>, Size] {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const ref = useRef<T>(null);

  useEffect(() => {
    let observer: ResizeObserver | undefined;

    const element = ref.current;
    if (element) {
      observer = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        setSize({ width, height });
      });

      observer.observe(element);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [ref]);

  return [ref, size];
}

