import { useLayoutEffect, useRef, useState } from 'react';

type Size = {
  width: number;
  height: number;
};

export default function useElementResizeObserver(
  element: HTMLElement | undefined
): Size {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useLayoutEffect(() => {
    let observer: ResizeObserver | undefined;

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
  }, [element]);

  return size;
}
